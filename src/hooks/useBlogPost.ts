import { useState, useEffect, useCallback } from "react";
import { BlogPostData, BlogPost } from "@/types/blog";
import { getPostAction } from "@/lib/actions/blog-actions";

export function useBlogPost(slug: string) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPost = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getPostAction(slug);
      
      if (result.success && result.data) {
        setPost(result.data);
      } else {
        setError(result.message || 'Post not found');
      }
    } catch (err) {
      console.error('Error loading post:', err);
      setError('Failed to load post. Please check your network connection.');
    } finally {
      setIsLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    loadPost();
  }, [loadPost]);

  return { post, isLoading, error, refetch: loadPost };
}