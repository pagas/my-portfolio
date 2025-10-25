import { NextRequest } from 'next/server';
import { getOrCreateUser } from '@/lib/users';
import { 
  withAuth, 
  createSuccessResponse, 
  ApiErrors,
  AuthenticatedUser 
} from '@/lib/api-middleware';

export const POST = withAuth(async (
  user: AuthenticatedUser,
  request: NextRequest
) => {
  try {
    // Get or create user profile
    const userProfile = await getOrCreateUser(user.uid, user.email!, user.name);

    return createSuccessResponse({
      uid: userProfile.uid,
      displayName: userProfile.displayName,
      slug: userProfile.slug,
      email: userProfile.email,
      bio: userProfile.bio,
      avatar: userProfile.avatar,
    });
  } catch (error) {
    console.error('Error ensuring user profile:', error);
    return ApiErrors.serverError();
  }
});
