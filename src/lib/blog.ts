// Re-export Firebase blog functions for backward compatibility
export { 
  getAllPosts, 
  getPostBySlug, 
  getRelatedPosts, 
  createPost, 
  updatePost, 
  deletePost 
} from './firebase-blog';