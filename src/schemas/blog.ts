import { z } from 'zod';

// Client-side schema (what users input - with refinements)
export const BlogPostDataSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be 200 characters or less'),
  description: z.string().min(1, 'Description is required').max(500, 'Description must be 500 characters or less'),
  tags: z.array(z.string().min(1, 'Tag cannot be empty').max(50, 'Tag must be 50 characters or less')).max(10, 'Maximum 10 tags allowed').optional(),
  coverImage: z.string().refine(
    (val) => val === '' || z.string().url().safeParse(val).success,
    'Must be a valid URL or empty string'
  ).optional().or(z.literal('')),
  content: z.string().min(1, 'Content is required').max(50000, 'Content must be 50,000 characters or less'),
}).refine(
  (data) => data.tags?.length === 0 || data.tags?.every(tag => tag.trim().length > 0),
  'Tags cannot be empty strings'
);

// Server-side schema (complete blog post with all fields) - using safeExtend
export const BlogPostSchema = BlogPostDataSchema.safeExtend({
  id: z.string().uuid('Must be a valid UUID'),
  slug: z.string().regex(/^[a-z0-9-]+$/, 'Must be a valid slug (lowercase letters, numbers, and hyphens only)'),
  authorId: z.string().min(1, 'Author ID is required'),
  date: z.string().datetime('Must be a valid ISO date'),
  readingTime: z.string().regex(/^\d+\s+min\s+read$/, 'Must be in format "X min read"'),
});

// Schema for creating new posts (client input)
export const CreatePostSchema = BlogPostDataSchema;

// Schema for updating existing posts (all fields optional except content)
export const UpdatePostSchema = BlogPostDataSchema.partial().extend({
  content: z.string().min(1, 'Content is required').max(50000, 'Content must be 50,000 characters or less'),
});

// Type exports for TypeScript - Single source of truth
export type BlogPostData = z.infer<typeof BlogPostDataSchema>;
export type BlogPost = z.infer<typeof BlogPostSchema>;
export type CreatePostData = z.infer<typeof CreatePostSchema>;
export type UpdatePostData = z.infer<typeof UpdatePostSchema>;
