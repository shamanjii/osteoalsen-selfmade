# 🤖 Automated Blog Publishing System

**Ziel**: Artikel batch-schreiben, als Drafts speichern, automatisch nach Schedule veröffentlichen

---

## 🏗️ System-Architektur

```
┌─────────────────────────────────────────────────────────────────┐
│                        CONTENT CREATION                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  Claude (Du sagst: "fahre mit Blog-Plan fort")                  │
│           ↓                                                       │
│  Schreibt Artikel (4000-5000 Wörter)                            │
│           ↓                                                       │
│  POST /api/cms/blog/create-draft                                 │
│           ↓                                                       │
│  CMS Database (PostgreSQL)                                       │
│    - Status: DRAFT                                               │
│    - scheduledPublishAt: 2025-10-20                              │
│    - publishedAt: null                                           │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                      AUTO-PUBLISHING                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  Cron Job (täglich 00:00 Uhr)                                   │
│           ↓                                                       │
│  Query: WHERE scheduledPublishAt <= NOW() AND status = DRAFT    │
│           ↓                                                       │
│  Update: status = PUBLISHED, publishedAt = scheduledPublishAt   │
│           ↓                                                       │
│  Trigger: Sync to Main Site                                      │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                       SYNC TO MAIN SITE                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  Convert HTML → Markdown                                         │
│           ↓                                                       │
│  Write to: /osteoalsen-selfmade/posts/[slug].md                │
│           ↓                                                       │
│  Git commit + push                                               │
│           ↓                                                       │
│  Vercel Auto-Deploy                                              │
│           ↓                                                       │
│  🎉 Artikel ist live auf www.osteoalsen.de                      │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔧 Implementation Plan

### **Step 1: CMS API Endpoint**
File: `/osteoalsen-cms/src/app/api/blog/create-draft/route.ts`

```typescript
export async function POST(req: Request) {
  const {
    title,
    slug,
    content,
    excerpt,
    metaTitle,
    metaDescription,
    keywords,
    scheduledPublishAt, // ISO string: "2025-10-20T00:00:00Z"
    coverImage
  } = await req.json();

  const post = await prisma.post.create({
    data: {
      title,
      slug,
      content,
      excerpt,
      metaTitle,
      metaDescription,
      keywords,
      coverImage,
      status: 'DRAFT',
      published: false,
      scheduledPublishAt: new Date(scheduledPublishAt),
      authorId: session.user.id, // from auth
    }
  });

  return Response.json({ success: true, post });
}
```

---

### **Step 2: Bulk Draft Creator**
File: `/osteoalsen-cms/src/app/api/blog/bulk-create/route.ts`

```typescript
export async function POST(req: Request) {
  const { articles, startDate, intervalDays } = await req.json();

  // articles: Array of article objects
  // startDate: "2025-10-15"
  // intervalDays: 3 (publish every 3 days)

  const created = [];

  for (let i = 0; i < articles.length; i++) {
    const scheduledDate = new Date(startDate);
    scheduledDate.setDate(scheduledDate.getDate() + (i * intervalDays));

    const post = await prisma.post.create({
      data: {
        ...articles[i],
        status: 'DRAFT',
        scheduledPublishAt: scheduledDate,
        authorId: session.user.id,
      }
    });

    created.push(post);
  }

  return Response.json({
    success: true,
    created: created.length,
    schedule: created.map(p => ({
      title: p.title,
      publishDate: p.scheduledPublishAt
    }))
  });
}
```

**Usage von Claude:**
```bash
curl -X POST https://cms.osteoalsen.de/api/blog/bulk-create \
  -H "Authorization: Bearer TOKEN" \
  -d '{
    "startDate": "2025-10-15",
    "intervalDays": 3,
    "articles": [
      { "title": "Nackenschmerzen...", "content": "...", ... },
      { "title": "Faszien-Übungen...", "content": "...", ... },
      ...
    ]
  }'
```

---

### **Step 3: Auto-Publisher Cron Job**
File: `/osteoalsen-cms/src/app/api/cron/publish-scheduled/route.ts`

```typescript
export async function GET(req: Request) {
  // Verify cron secret
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const now = new Date();

  // Find all drafts that should be published
  const postsToPublish = await prisma.post.findMany({
    where: {
      status: 'DRAFT',
      scheduledPublishAt: {
        lte: now
      }
    }
  });

  // Publish them
  for (const post of postsToPublish) {
    await prisma.post.update({
      where: { id: post.id },
      data: {
        status: 'PUBLISHED',
        published: true,
        publishedAt: post.scheduledPublishAt, // Use scheduled date for SEO
      }
    });

    // Trigger sync to main site
    await fetch('https://cms.osteoalsen.de/api/sync/to-main-site', {
      method: 'POST',
      body: JSON.stringify({ postId: post.id })
    });
  }

  return Response.json({
    success: true,
    published: postsToPublish.length,
    posts: postsToPublish.map(p => p.title)
  });
}
```

**Vercel Cron Setup:**
File: `/osteoalsen-cms/vercel.json`
```json
{
  "crons": [{
    "path": "/api/cron/publish-scheduled",
    "schedule": "0 0 * * *"
  }]
}
```

---

### **Step 4: Sync to Main Site**
File: `/osteoalsen-cms/src/app/api/sync/to-main-site/route.ts`

```typescript
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';

const execAsync = promisify(exec);

export async function POST(req: Request) {
  const { postId } = await req.json();

  // Get post from database
  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: { tags: { include: { tag: true } } }
  });

  if (!post || post.status !== 'PUBLISHED') {
    return Response.json({ error: 'Post not found or not published' }, { status: 404 });
  }

  // Convert to Markdown format
  const markdown = generateMarkdown(post);

  // Write to main site repository
  const filePath = `/Users/LumosVitalis/osteoalsen-selfmade/posts/${post.slug}.md`;
  await fs.writeFile(filePath, markdown);

  // Git commit and push
  const repoPath = '/Users/LumosVitalis/osteoalsen-selfmade';
  await execAsync(`cd ${repoPath} && git add posts/${post.slug}.md`);
  await execAsync(`cd ${repoPath} && git commit -m "📝 Publish: ${post.title}"`);
  await execAsync(`cd ${repoPath} && git push`);

  return Response.json({
    success: true,
    message: 'Synced to main site and pushed to GitHub',
    file: filePath
  });
}

function generateMarkdown(post: any): string {
  return `---
slug: ${post.slug}
title: "${post.title}"
excerpt: "${post.excerpt}"
keywords:
${post.keywords?.split(',').map((k: string) => `  - "${k.trim()}"`).join('\n')}
image: "${post.coverImage}"
date: "${post.publishedAt.toISOString()}"
status: published
---

${post.content}
`;
}
```

---

### **Step 5: Schedule Dashboard (CMS Frontend)**
File: `/osteoalsen-cms/src/app/blog/schedule/page.tsx`

```typescript
'use client';

export default function ScheduleDashboard() {
  const [posts, setPosts] = useState([]);

  // Fetch all posts with scheduling info
  useEffect(() => {
    fetch('/api/blog/scheduled').then(r => r.json()).then(setPosts);
  }, []);

  return (
    <div>
      <h1>Blog Publishing Schedule</h1>

      {/* Calendar View */}
      <Calendar>
        {posts.map(post => (
          <Event
            key={post.id}
            date={post.scheduledPublishAt}
            title={post.title}
            status={post.status}
            draggable
            onDrop={newDate => updateSchedule(post.id, newDate)}
          />
        ))}
      </Calendar>

      {/* List View */}
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Scheduled For</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map(post => (
            <tr key={post.id}>
              <td>{post.title}</td>
              <td>
                <Badge status={post.status}>{post.status}</Badge>
              </td>
              <td>
                <DatePicker
                  value={post.scheduledPublishAt}
                  onChange={date => updateSchedule(post.id, date)}
                />
              </td>
              <td>
                <Button onClick={() => publishNow(post.id)}>
                  Publish Now
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

---

## 📅 Publishing Schedule Generator

File: `/docs/BLOG_PUBLISHING_SCHEDULE.md`

```markdown
# Blog Publishing Schedule

## Phase 1: Quick Wins (6 Artikel über 3 Wochen)

| # | Artikel | Publish Date | Days from Start |
|---|---------|--------------|-----------------|
| 1 | Nackenschmerzen & HWS | 15.10.2025 | +2 |
| 2 | Faszien-Übungen | 18.10.2025 | +5 |
| 3 | Ergonomie Arbeitsplatz | 22.10.2025 | +9 |
| 4 | Büroangestellte | 25.10.2025 | +12 |
| 5 | 3 Säulen Osteopathie | 29.10.2025 | +16 |
| 6 | Osteo vs Physio | 01.11.2025 | +19 |

## Phase 2: Steady Publishing (1 Artikel/Woche)

Starting 08.11.2025, every Friday
```

---

## 🚀 Workflow für dich:

### **Initiale Batch-Erstellung (heute):**

1. Du sagst: **"erstelle die ersten 6 blog-artikel als drafts"**

2. Claude:
   - Schreibt alle 6 Artikel (24-30h Arbeit)
   - Ruft `/api/blog/bulk-create` auf
   - Alle werden als DRAFT mit Schedule gespeichert

3. Du siehst im CMS Dashboard:
   ```
   📝 6 Articles scheduled
   ✅ Next publish: 15.10.2025 - Nackenschmerzen & HWS
   ⏳ Then: 18.10.2025 - Faszien-Übungen
   ...
   ```

### **Danach: Auto-Pilot:**

- **Täglich 00:00**: Cron Job prüft Schedule
- **Wenn Publish-Datum erreicht**:
  - Status → PUBLISHED
  - Sync zu Main Site
  - Git Push
  - Vercel Deploy
  - 🎉 Artikel ist live

### **Ongoing: Neue Artikel hinzufügen**

Du sagst: **"fahre mit Blog-Plan fort"**
- Claude schreibt nächsten Artikel
- Speichert mit scheduledPublishAt = +7 Tage
- System published automatisch

---

## ✅ Vorteile dieses Systems:

1. **Batch-Writing**: Alle Artikel auf einmal schreiben
2. **Natürliches Publishing**: Gestaffelt über Wochen
3. **Kein manuelles Eingreifen**: Vollautomatisch
4. **Flexible Anpassung**: Im CMS Dates verschieben möglich
5. **Revision History**: Alle Drafts bleiben erhalten
6. **SEO-Safe**: publishedAt wird korrekt gesetzt
7. **Rollback möglich**: Draft → Published ist reversibel

---

## 🎯 Nächste Schritte:

1. ✅ Ich baue die 5 API Endpoints (2-3 Stunden)
2. ✅ Ich erstelle das Schedule Dashboard (1-2 Stunden)
3. ✅ Du testest im CMS
4. ✅ Ich schreibe die ersten 6 Artikel als Batch
5. ✅ Bulk-Upload ins CMS mit Schedule
6. ✅ System läuft auf Auto-Pilot

**Geschätzter Zeitaufwand für Implementation**: 4-5 Stunden
**Dann: Fully automated content publishing** 🚀

---

**Möchtest du, dass ich das jetzt baue?**
