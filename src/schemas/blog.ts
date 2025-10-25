import { z } from 'zod';

// Base blog post data schema
export const BlogPostDataSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be 200 characters or less'),
  description: z.string().min(1, 'Description is required').max(500, 'Description must be 500 characters or less'),
  tags: z.array(z.string().min(1, 'Tag cannot be empty').max(50, 'Tag must be 50 characters or less')).max(10, 'Maximum 10 tags allowed').optional(),
  coverImage: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  content: z.string().min(1, 'Content is required').max(50000, 'Content must be 50,000 characters or less'),
});

// Schema for creating new posts (includes authorId)
export const CreatePostSchema = BlogPostDataSchema.extend({
  authorId: z.string().min(1, 'Author ID is required'),
});

// Schema for updating existing posts (all fields optional except content)
export const UpdatePostSchema = BlogPostDataSchema.partial().extend({
  content: z.string().min(1, 'Content is required').max(50000, 'Content must be 50,000 characters or less'),
});

// Schema for API request body (what clients send)
export const CreatePostRequestSchema = BlogPostDataSchema;

// Schema for API request body (what clients send for updates)
export const UpdatePostRequestSchema = UpdatePostSchema;

// Type exports for TypeScript
export type BlogPostData = z.infer<typeof BlogPostDataSchema>;
export type CreatePostData = z.infer<typeof CreatePostSchema>;
export type UpdatePostData = z.infer<typeof UpdatePostSchema>;
export type CreatePostRequest = z.infer<typeof CreatePostRequestSchema>;
export type UpdatePostRequest = z.infer<typeof UpdatePostRequestSchema>;
