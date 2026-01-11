# Google Search Console Scripts - README

## Available Scripts

### 1. gsc-30-90-day-analysis.ts
**Purpose:** Comprehensive analysis of 7/30/90 day periods  
**Usage:**
```bash
npx tsx scripts/gsc-30-90-day-analysis.ts
```
**Output:**
- Overview metrics for each period
- Trend analysis
- Top 30 queries
- Top 20 pages
- Device breakdown
- Country breakdown

### 2. gsc-detailed-7days.ts
**Purpose:** Detailed query and page analysis for last 7 days  
**Usage:**
```bash
npx tsx scripts/gsc-detailed-7days.ts
```
**Output:**
- All queries with clicks
- All pages with clicks
- Query-to-page mappings

### 3. gsc-1day.ts
**Purpose:** Quick 24-hour snapshot  
**Usage:**
```bash
npx tsx scripts/gsc-1day.ts
```

### 4. gsc-24h-analysis.ts
**Purpose:** Detailed 24-hour analysis  
**Usage:**
```bash
npx tsx scripts/gsc-24h-analysis.ts
```

### 5. gsc-indexing-check.ts
**Purpose:** Check indexing status of pages  
**Usage:**
```bash
npx tsx scripts/gsc-indexing-check.ts
```

### 6. test-gsc.ts
**Purpose:** Test GSC API connection  
**Usage:**
```bash
npx tsx scripts/test-gsc.ts
```

## Quick Reference Commands

### Monthly Analysis (Recommended)
```bash
npx tsx scripts/gsc-30-90-day-analysis.ts > analysis_$(date +%Y-%m-%d).txt
```

### Weekly Check
```bash
npx tsx scripts/gsc-detailed-7days.ts
```

### Daily Monitor
```bash
npx tsx scripts/gsc-1day.ts
```

## Data Export

To save output to file:
```bash
npx tsx scripts/gsc-30-90-day-analysis.ts > GSC_Report_$(date +%Y-%m-%d).txt
```

## Environment Setup

Required environment variables in `.env`:
```
GOOGLE_SERVICE_ACCOUNT_KEY_PATH=./credentials/google-search-console.json
GOOGLE_SEARCH_CONSOLE_DOMAIN=osteoalsen.de
```

## Analysis Schedule

**Recommended:**
- Daily: Quick 1-day check (if traffic changes significantly)
- Weekly: 7-day detailed analysis
- Monthly: Full 30/90-day comprehensive analysis

**Last Full Analysis:** 2026-01-11

## Output Files

Analysis reports are saved as:
- `GSC_ANALYSIS_[date].md` - Full comprehensive analysis
- `GSC_QUICK_SUMMARY.md` - Quick reference
- `GSC_ACTION_PLAN.md` - Prioritized action items

## Troubleshooting

### Authentication Error
```bash
# Check credentials file exists
ls -l credentials/google-search-console.json

# Verify environment variable
echo $GOOGLE_SERVICE_ACCOUNT_KEY_PATH
```

### No Data Returned
- GSC data is typically 1-2 days delayed
- Check date ranges in script
- Verify site ownership in Google Search Console

### Module Not Found
```bash
# Reinstall dependencies
npm install
```

## API Limits

Google Search Console API has the following limits:
- Requests: 1,200 per minute
- Daily quota: Effectively unlimited for normal use

Scripts are designed to stay well within these limits.

## Next Steps

After running analysis:
1. Review `GSC_ANALYSIS_[date].md`
2. Check `GSC_QUICK_SUMMARY.md` for highlights
3. Execute items from `GSC_ACTION_PLAN.md`
4. Track progress monthly

---

**Last Updated:** 2026-01-11
**Maintained by:** Development Team
