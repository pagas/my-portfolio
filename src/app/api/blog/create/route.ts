import { NextRequest } from 'next/server';
import { createPost } from '@/lib/firebase-blog';
import { getOrCreateUser } from '@/lib/users';
import { 
  withAuth, 
  createSuccessResponse, 
  ApiErrors,
  validateRequestBody,
  AuthenticatedUser 
} from '@/lib/api-middleware';
import { CreatePostRequestSchema } from '@/schemas/blog';

export const POST = withAuth(async (
  user: AuthenticatedUser,
  request: NextRequest
) => {
  try {
    // Parse and validate request body
    const body = await request.json();
    const { data: validatedData, error: validationError } = validateRequestBody(body, CreatePostRequestSchema);
    
    if (validationError) {
      return validationError;
    }

    // Get or create user profile
    const userProfile = await getOrCreateUser(user.uid, user.email!, user.name);

    const result = await createPost({
      title: validatedData!.title,
      description: validatedData!.description,
      tags: validatedData!.tags || [],
      authorId: userProfile.uid,
      coverImage: validatedData!.coverImage || '',
      content: validatedData!.content,
    });

    if (result.success) {
      return createSuccessResponse(
        { slug: result.id }, 
        result.message
      );
    } else {
      return result.message.includes('already exists') 
        ? ApiErrors.conflict(result.message)
        : ApiErrors.serverError(result.message);
    }
  } catch (error) {
    console.error('Error creating blog post:', error);
    return ApiErrors.serverError();
  }
});