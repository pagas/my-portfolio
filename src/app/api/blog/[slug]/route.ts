import { NextRequest } from 'next/server';
import { getPostBySlug, updatePost, deletePost } from '@/lib/firebase-blog';
import { 
  withOptionalAuth, 
  withAuth, 
  createSuccessResponse, 
  ApiErrors,
  validateRequestBody,
  AuthenticatedUser 
} from '@/lib/api-middleware';
import { z } from 'zod';

// Input validation schemas
const UpdatePostSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  description: z.string().min(1).max(500).optional(),
  tags: z.array(z.string().min(1).max(50)).max(10).optional(),
  coverImage: z.string().url().optional().or(z.literal('')),
  content: z.string().min(1).max(50000),
});

// GET handler - no authentication required for reading posts
export const GET = withOptionalAuth(async (
  user: AuthenticatedUser | null,
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) => {
  try {
    const { slug } = await params;
    
    // Validate slug format
    if (!slug || typeof slug !== 'string' || slug.length === 0) {
      return ApiErrors.validation('Invalid slug parameter');
    }

    const post = await getPostBySlug(slug);
    
    if (!post) {
      return ApiErrors.notFound('Post not found');
    }

    return createSuccessResponse(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    return ApiErrors.serverError();
  }
});

// PUT handler - requires authentication for updating posts
export const PUT = withAuth(async (
  user: AuthenticatedUser,
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) => {
  try {
    const { slug } = await params;
    
    // Validate slug format
    if (!slug || typeof slug !== 'string' || slug.length === 0) {
      return ApiErrors.validation('Invalid slug parameter');
    }

    // Parse and validate request body
    const body = await request.json();
    const { data: validatedData, error: validationError } = validateRequestBody(body, UpdatePostSchema);
    
    if (validationError) {
      return validationError;
    }

    const result = await updatePost(slug, validatedData!);

    if (result.success) {
      return createSuccessResponse(null, result.message);
    } else {
      return result.message.includes('not found') 
        ? ApiErrors.notFound(result.message)
        : ApiErrors.serverError(result.message);
    }
  } catch (error) {
    console.error('Error updating post:', error);
    return ApiErrors.serverError();
  }
});

// DELETE handler - requires authentication for deleting posts
export const DELETE = withAuth(async (
  user: AuthenticatedUser,
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) => {
  try {
    const { slug } = await params;
    
    // Validate slug format
    if (!slug || typeof slug !== 'string' || slug.length === 0) {
      return ApiErrors.validation('Invalid slug parameter');
    }

    const result = await deletePost(slug);

    if (result.success) {
      return createSuccessResponse(null, result.message);
    } else {
      return result.message.includes('not found') 
        ? ApiErrors.notFound(result.message)
        : ApiErrors.serverError(result.message);
    }
  } catch (error) {
    console.error('Error deleting post:', error);
    return ApiErrors.serverError();
  }
});