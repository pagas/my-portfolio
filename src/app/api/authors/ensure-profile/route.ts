import { NextRequest, NextResponse } from 'next/server';
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

    // Get or create user profile
    const user = await getOrCreateUser(authUser.uid, authUser.email!, authUser.name);

    return NextResponse.json({
      success: true,
      user: {
        uid: user.uid,
        displayName: user.displayName,
        slug: user.slug,
        email: user.email,
        bio: user.bio,
        avatar: user.avatar,
      }
    });

  } catch (error) {
    console.error('Error ensuring user profile:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
