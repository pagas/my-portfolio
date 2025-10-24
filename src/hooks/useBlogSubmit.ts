import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { BlogPostData } from "@/types/blog";

export function useBlogSubmit(slug?: string) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitPost = useCallback(async (formData: BlogPostData) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const url = slug ? `/api/blog/${slug}` : '/api/blog/create';
      const method = slug ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        // For new posts, redirect to the blog listing
        // For updates, redirect to the updated post
        if (slug) {
          router.push(`/blog/${slug}`);
        } else {
          router.push('/blog');
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message || `Error ${slug ? 'updating' : 'creating'} post`);
      }
    } catch (err) {
      console.error(`Error ${slug ? 'updating' : 'creating'} blog post:`, err);
      setError(`Failed to ${slug ? 'update' : 'create'} blog post. Please try again.`);
    } finally {
      setIsSubmitting(false);
    }
  }, [slug, router]);

  const clearError = useCallback(() => setError(null), []);

  return { submitPost, isSubmitting, error, clearError };
}