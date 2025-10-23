import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { BlogPostData } from "./useBlogPost";

export function useBlogSubmit(slug: string) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitPost = useCallback(async (formData: BlogPostData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const mdxContent = `---
title: "${formData.title}"
date: "${formData.date}"
description: "${formData.description}"
tags: [${formData.tags.map(tag => `"${tag}"`).join(', ')}]
author: "${formData.author}"
coverImage: "${formData.coverImage}"
---

${formData.content}`;

      const response = await fetch(`/api/blog/${slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: mdxContent,
        }),
      });

      if (response.ok) {
        router.push(`/blog/${slug}`);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to update post');
      }
    } catch (err) {
      console.error('Error updating blog post:', err);
      setError('Failed to update blog post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [slug, router]);

  return {
    isSubmitting,
    error,
    submitPost,
    clearError: () => setError(null),
  };
}
