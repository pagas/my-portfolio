// Re-export Firebase blog functions for backward compatibility
export { 
  getAllPosts, 
  getPostBySlug, 
  getRelatedPosts, 
  createPost, 
  updatePost, 
  deletePost,
  getAllPostsWithAuthors,
  getPostBySlugWithAuthor
} from './firebase-blog';

export type { BlogPostWithAuthor } from './firebase-blog';