import { useState, useEffect, useCallback } from "react";
import { BlogPostData, BlogPost } from "@/types/blog";

export function useBlogPost(slug: string) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPost = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/blog/${slug}`);
      if (response.ok) {
        const data = await response.json();
        setPost(data);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Post not found');
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