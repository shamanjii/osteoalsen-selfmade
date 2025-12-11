import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { path, secret } = body;

    // Verify secret token
    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json(
        { message: 'Invalid secret' },
        { status: 401 }
      );
    }

    // Revalidate specific path or all blog posts
    if (path === 'all-blog') {
      // Revalidate all blog post paths
      revalidatePath('/blog/[slug]', 'page');
      return NextResponse.json({
        revalidated: true,
        message: 'All blog posts revalidated',
        now: Date.now()
      });
    } else if (path) {
      revalidatePath(path);
      return NextResponse.json({
        revalidated: true,
        path,
        now: Date.now()
      });
    }

    return NextResponse.json(
      { message: 'No path specified' },
      { status: 400 }
    );
  } catch (err) {
    console.error('Revalidation error:', err);
    return NextResponse.json(
      { message: 'Error revalidating', error: String(err) },
      { status: 500 }
    );
  }
}
