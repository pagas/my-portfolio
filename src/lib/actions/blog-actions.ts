'use server';

import { revalidatePath } from "next/cache";
import { createPost, updatePost, deletePost, getPostBySlug } from '@/lib/blog/firebase-blog';
import { getOrCreateUser } from '@/lib/auth/users';
import { requireAuth } from '@/lib/auth/server-auth';
import { CreatePostRequestSchema, UpdatePostRequestSchema } from '@/schemas/blog';

export async function deletePostAction(slug: string) {
  try {
    // Require authentication
    const user = await requireAuth();
    
    // Pass userId to verify ownership
    const result = await deletePost(slug, user.uid);
    
    if (result.success) {
      // Revalidate the blog pages to update the cache
      revalidatePath('/blog');
      revalidatePath('/admin/blog/manage');
    }
    
    return result;
  } catch (error) {
    console.error('Error deleting post:', error);
    if (error instanceof Error && error.message === 'Authentication required') {
      return { success: false, message: 'Authentication required' };
    }
    return { success: false, message: 'Failed to delete post' };
  }
}

export async function createPostAction(formData: FormData) {
  try {
    // Require authentication
    const user = await requireAuth();
    
    // Extract and validate form data
    const rawData = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      tags: formData.get('tags') ? JSON.parse(formData.get('tags') as string) : [],
      coverImage: formData.get('coverImage') as string || '',
      content: formData.get('content') as string,
    };

    // Validate input data
    const validationResult = CreatePostRequestSchema.safeParse(rawData);
    if (!validationResult.success) {
      return {
        success: false,
        message: 'Invalid input data',
        errors: validationResult.error.issues.map((err: any) => ({
          field: err.path[0],
          message: err.message
        }))
      };
    }

    const validatedData = validationResult.data;

    // Get or create user profile
    const userProfile = await getOrCreateUser(user.uid, user.email!, user.name);

    const result = await createPost({
      ...validatedData,
      tags: validatedData.tags || [],
      coverImage: validatedData.coverImage || '',
      authorId: userProfile.uid,
    });
    
    if (result.success) {
      // Revalidate the blog pages
      revalidatePath('/blog');
      revalidatePath('/admin/blog/manage');
    }
    
    return result;
  } catch (error) {
    console.error('Error creating blog post:', error);
    if (error instanceof Error && error.message === 'Authentication required') {
      return { success: false, message: 'Authentication required' };
    }
    return { success: false, message: 'Internal server error' };
  }
}

export async function updatePostAction(slug: string, formData: FormData) {
  try {
    // Require authentication
    const user = await requireAuth();
    
    // Extract and validate form data
    const rawData = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      tags: formData.get('tags') ? JSON.parse(formData.get('tags') as string) : [],
      coverImage: formData.get('coverImage') as string || '',
      content: formData.get('content') as string,
    };

    // Validate input data
    const validationResult = UpdatePostRequestSchema.safeParse(rawData);
    if (!validationResult.success) {
      return {
        success: false,
        message: 'Invalid input data',
        errors: validationResult.error.issues.map((err: any) => ({
          field: err.path[0],
          message: err.message
        }))
      };
    }

    const validatedData = validationResult.data;

    const result = await updatePost(slug, validatedData);
    
    if (result.success) {
      // Revalidate the blog pages
      revalidatePath('/blog');
      revalidatePath('/admin/blog/manage');
      revalidatePath(`/blog/${slug}`);
    }
    
    return result;
  } catch (error) {
    console.error('Error updating blog post:', error);
    if (error instanceof Error && error.message === 'Authentication required') {
      return { success: false, message: 'Authentication required' };
    }
    return { success: false, message: 'Internal server error' };
  }
}

// New action for getting a single post (replaces API GET)
export async function getPostAction(slug: string) {
  try {
    const post = await getPostBySlug(slug);
    
    if (!post) {
      return { success: false, message: 'Post not found' };
    }
    
    return { success: true, data: post };
  } catch (error) {
    console.error('Error fetching post:', error);
    return { success: false, message: 'Failed to fetch post' };
  }
}