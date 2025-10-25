// Re-export Firebase blog functions for backward compatibility
export { 
  getAllPosts, 
  getPostBySlug, 
  getRelatedPosts, 
  createPost, 
  updatePost, 
  deletePost,
  getAllPostsWithUsers,
  getPostBySlugWithUser
} from './firebase-blog';

export type { BlogPostWithUser } from './firebase-blog';