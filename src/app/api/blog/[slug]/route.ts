import { NextRequest, NextResponse } from 'next/server';
import { getPostBySlug } from '@/lib/blog';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const post = getPostBySlug(params.slug);
    
    if (!post) {
      return NextResponse.json(
        { message: 'Post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { content } = await request.json();

    if (!content) {
      return NextResponse.json(
        { message: 'Content is required' },
        { status: 400 }
      );
    }

    const postsDirectory = path.join(process.cwd(), 'content/blog');
    const filePath = path.join(postsDirectory, `${params.slug}.mdx`);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { message: 'Post not found' },
        { status: 404 }
      );
    }

    // Write the updated content
    fs.writeFileSync(filePath, content, 'utf8');

    return NextResponse.json(
      { message: 'Blog post updated successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
