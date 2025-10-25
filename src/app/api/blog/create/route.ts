import { NextRequest, NextResponse } from 'next/server';
import { createPost } from '@/lib/firebase-blog';
import { verifyFirebaseToken } from '@/lib/auth-utils';
import { getOrCreateUser } from '@/lib/users';

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { message: 'Authentication required' },
        { status: 401 }
      );
    }

    const token = authHeader.split('Bearer ')[1];
    const authUser = await verifyFirebaseToken(token);
    
    if (!authUser) {
      return NextResponse.json(
        { message: 'Invalid authentication token' },
        { status: 401 }
      );
    }

    const { title, description, tags, coverImage, content } = await request.json();

    // Validate required fields
    if (!title || !description || !content) {
      return NextResponse.json(
        { message: 'Title, description, and content are required' },
        { status: 400 }
      );
    }

    // Get or create user profile
    const userProfile = await getOrCreateUser(authUser.uid, authUser.email!, authUser.name);

    const result = await createPost({
      title,
      description,
      tags: tags || [],
      authorId: userProfile.uid,
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