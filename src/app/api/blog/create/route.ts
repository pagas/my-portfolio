import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

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

    const postsDirectory = path.join(process.cwd(), 'content/blog');
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(postsDirectory)) {
      fs.mkdirSync(postsDirectory, { recursive: true });
    }

    const filePath = path.join(postsDirectory, `${slug}.mdx`);

    // Check if file already exists
    if (fs.existsSync(filePath)) {
      return NextResponse.json(
        { message: 'A post with this slug already exists' },
        { status: 409 }
      );
    }

    // Write the file
    fs.writeFileSync(filePath, content, 'utf8');

    return NextResponse.json(
      { message: 'Blog post created successfully', slug },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
