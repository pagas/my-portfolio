import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { BlogPostData } from "@/types/blog";

export function useNewPostForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [formData, setFormData] = useState<BlogPostData>({
    title: "",
    description: "",
    tags: [],
    author: "Your Name",
    coverImage: "",
    content: "",
  });
  const [tagInput, setTagInput] = useState("");

  const handleInputChange = useCallback((field: keyof BlogPostData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const handleAddTag = useCallback(() => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput("");
    }
  }, [tagInput, formData.tags]);

  const handleRemoveTag = useCallback((tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  }, []);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  }, [handleAddTag]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Generate slug from title
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      const mdxContent = `---
title: "${formData.title}"
date: "${new Date().toISOString().split('T')[0]}"
description: "${formData.description}"
tags: [${formData.tags.map(tag => `"${tag}"`).join(', ')}]
author: "${formData.author}"
coverImage: "${formData.coverImage}"
---

${formData.content}`;

      const response = await fetch('/api/blog/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          slug,
          content: mdxContent,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        router.push(`/blog/${result.slug}`);
      } else {
        const error = await response.json();
        alert(`Error creating post: ${error.message}`);
      }
    } catch (error) {
      console.error('Error creating blog post:', error);
      alert('Failed to create blog post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, router]);

  return {
    formData,
    tagInput,
    setTagInput,
    isSubmitting,
    previewMode,
    setPreviewMode,
    handleInputChange,
    handleAddTag,
    handleRemoveTag,
    handleKeyPress,
    handleSubmit,
  };
}
