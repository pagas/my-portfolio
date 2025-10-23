'use server';

import { revalidatePath } from "next/cache";
import fs from "fs";
import path from "path";

export async function deletePost(slug: string) {
  try {
    const postsDirectory = path.join(process.cwd(), 'content/blog');
    const filePath = path.join(postsDirectory, `${slug}.mdx`);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      throw new Error('Post not found');
    }

    // Delete the file
    fs.unlinkSync(filePath);

    // Revalidate the blog pages to update the cache
    revalidatePath('/blog');
    revalidatePath('/admin/blog/manage');
    
    return { success: true, message: 'Post deleted successfully' };
  } catch (error) {
    console.error('Error deleting post:', error);
    return { success: false, message: 'Failed to delete post' };
  }
}

export async function createPost(slug: string, content: string) {
  try {
    const postsDirectory = path.join(process.cwd(), 'content/blog');
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(postsDirectory)) {
      fs.mkdirSync(postsDirectory, { recursive: true });
    }

    const filePath = path.join(postsDirectory, `${slug}.mdx`);

    // Check if file already exists
    if (fs.existsSync(filePath)) {
      return { success: false, message: 'A post with this slug already exists' };
    }

    // Write the file
    fs.writeFileSync(filePath, content, 'utf8');

    // Revalidate the blog pages
    revalidatePath('/blog');
    revalidatePath('/admin/blog/manage');

    return { success: true, message: 'Blog post created successfully', slug };
  } catch (error) {
    console.error('Error creating blog post:', error);
    return { success: false, message: 'Internal server error' };
  }
}

export async function updatePost(slug: string, content: string) {
  try {
    const postsDirectory = path.join(process.cwd(), 'content/blog');
    const filePath = path.join(postsDirectory, `${slug}.mdx`);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return { success: false, message: 'Post not found' };
    }

    // Write the updated content
    fs.writeFileSync(filePath, content, 'utf8');

    // Revalidate the blog pages
    revalidatePath('/blog');
    revalidatePath('/admin/blog/manage');
    revalidatePath(`/blog/${slug}`);

    return { success: true, message: 'Blog post updated successfully' };
  } catch (error) {
    console.error('Error updating blog post:', error);
    return { success: false, message: 'Internal server error' };
  }
}
