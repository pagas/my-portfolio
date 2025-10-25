import { z } from 'zod';

// Base blog post data schema
export const BlogPostDataSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be 200 characters or less'),
  description: z.string().min(1, 'Description is required').max(500, 'Description must be 500 characters or less'),
  tags: z.array(z.string().min(1, 'Tag cannot be empty').max(50, 'Tag must be 50 characters or less')).max(10, 'Maximum 10 tags allowed').optional(),
  authorId: z.string().min(1, 'Author ID is required'),
  coverImage: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  content: z.string().min(1, 'Content is required').max(50000, 'Content must be 50,000 characters or less'),
  date: z.string().optional(),
});

// Complete blog post schema (includes generated fields)
export const BlogPostSchema = BlogPostDataSchema.extend({
  id: z.string(),
  slug: z.string(),
  readingTime: z.string(),
  date: z.string(), // Required in BlogPost (not optional)
});

// Schema for creating new posts
export const CreatePostSchema = BlogPostDataSchema;

// Schema for updating existing posts (all fields optional except content)
export const UpdatePostSchema = BlogPostDataSchema.partial().extend({
  content: z.string().min(1, 'Content is required').max(50000, 'Content must be 50,000 characters or less'),
});

// Schema for API request body (what clients send)
export const CreatePostRequestSchema = BlogPostDataSchema;

// Schema for API request body (what clients send for updates)
export const UpdatePostRequestSchema = UpdatePostSchema;

// Type exports for TypeScript - Single source of truth
export type BlogPostData = z.infer<typeof BlogPostDataSchema>;
export type BlogPost = z.infer<typeof BlogPostSchema>;
export type CreatePostData = z.infer<typeof CreatePostSchema>;
export type UpdatePostData = z.infer<typeof UpdatePostSchema>;
export type CreatePostRequest = z.infer<typeof CreatePostRequestSchema>;
export type UpdatePostRequest = z.infer<typeof UpdatePostRequestSchema>;
