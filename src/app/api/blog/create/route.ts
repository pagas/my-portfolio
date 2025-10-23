import { NextRequest, NextResponse } from 'next/server';
import { createPost } from '@/lib/actions/blog-actions';

export async function POST(request: NextRequest) {
  try {
    const { slug, content } = await request.json();

    if (!slug || !content) {
      return NextResponse.json(
        { message: 'Slug and content are required' },
        { status: 400 }
      );
    }

    // Validate slug format
    const slugRegex = /^[a-z0-9-]+$/;
    if (!slugRegex.test(slug)) {
      return NextResponse.json(
        { message: 'Invalid slug format. Use only lowercase letters, numbers, and hyphens.' },
        { status: 400 }
      );
    }

    const result = await createPost(slug, content);

    if (result.success) {
      return NextResponse.json(
        { message: result.message, slug: result.slug },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { message: result.message },
        { status: result.message.includes('already exists') ? 409 : 500 }
      );
    }

  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
