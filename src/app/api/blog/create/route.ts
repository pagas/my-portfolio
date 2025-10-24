import { NextRequest, NextResponse } from 'next/server';
import { createPost } from '@/lib/firebase-blog';

export async function POST(request: NextRequest) {
  try {
    const { title, description, tags, author, coverImage, content } = await request.json();

    // Validate required fields
    if (!title || !description || !content) {
      return NextResponse.json(
        { message: 'Title, description, and content are required' },
        { status: 400 }
      );
    }

    const result = await createPost({
      title,
      description,
      tags: tags || [],
      author: author || 'Your Name',
      coverImage: coverImage || '',
      content,
    });

    if (result.success) {
      return NextResponse.json(
        { message: result.message, slug: result.id },
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