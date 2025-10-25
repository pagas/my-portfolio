import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { BlogPostData } from "@/types/blog";
import { createPostAction, updatePostAction } from "@/lib/actions/blog-actions";

export function useBlogSubmit(slug?: string) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitPost = useCallback(async (formData: BlogPostData) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Convert to FormData for Server Actions
      const formDataObj = new FormData();
      formDataObj.append('title', formData.title);
      formDataObj.append('description', formData.description);
      formDataObj.append('tags', JSON.stringify(formData.tags));
      formDataObj.append('coverImage', formData.coverImage);
      formDataObj.append('content', formData.content);

      const result = slug 
        ? await updatePostAction(slug, formDataObj)
        : await createPostAction(formDataObj);

      if (result.success) {
        if (slug) {
          router.push(`/blog/${slug}`);
        } else if ('id' in result) {
          router.push(`/blog/${result.id}`);
        } else {
          router.push('/blog');
        }
      } else {
        setError(result.message);
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