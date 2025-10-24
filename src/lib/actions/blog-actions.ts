'use server';

import { revalidatePath } from "next/cache";
import { createPost, updatePost, deletePost } from '@/lib/firebase-blog';

export async function deletePostAction(slug: string) {
  try {
    const result = await deletePost(slug);
    
    if (result.success) {
      // Revalidate the blog pages to update the cache
      revalidatePath('/blog');
      revalidatePath('/admin/blog/manage');
    }
    
    return result;
  } catch (error) {
    console.error('Error deleting post:', error);
    return { success: false, message: 'Failed to delete post' };
  }
}

export async function createPostAction(postData: {
  title: string;
  description: string;
  tags: string[];
  author: string;
  coverImage: string;
  content: string;
}) {
  try {
    const result = await createPost(postData);
    
    if (result.success) {
      // Revalidate the blog pages
      revalidatePath('/blog');
      revalidatePath('/admin/blog/manage');
    }
    
    return result;
  } catch (error) {
    console.error('Error creating blog post:', error);
    return { success: false, message: 'Internal server error' };
  }
}

export async function updatePostAction(slug: string, postData: {
  title?: string;
  description?: string;
  tags?: string[];
  author?: string;
  coverImage?: string;
  content?: string;
}) {
  try {
    const result = await updatePost(slug, postData);
    
    if (result.success) {
      // Revalidate the blog pages
      revalidatePath('/blog');
      revalidatePath('/admin/blog/manage');
      revalidatePath(`/blog/${slug}`);
    }
    
    return result;
  } catch (error) {
    console.error('Error updating blog post:', error);
    return { success: false, message: 'Internal server error' };
  }
}