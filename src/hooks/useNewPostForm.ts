import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BlogPostData } from "@/schemas/blog";
import { useAuth } from "@/contexts/AuthContext";
import { createPostAction } from "@/lib/actions/blog-actions";

export function useNewPostForm() {
  const router = useRouter();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [formData, setFormData] = useState<BlogPostData>({
    title: "",
    description: "",
    tags: [],
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
    if (tagInput.trim() && !(formData.tags ?? []).includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...(prev.tags ?? []), tagInput.trim()]
      }));
      setTagInput("");
    }
  }, [tagInput, formData.tags]);

  const handleRemoveTag = useCallback((tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: (prev.tags ?? []).filter(tag => tag !== tagToRemove)
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
      // Create FormData for Server Action
      const formDataObj = new FormData();
      formDataObj.append('title', formData.title);
      formDataObj.append('description', formData.description);
      formDataObj.append('tags', JSON.stringify(formData.tags ?? []));
      formDataObj.append('coverImage', formData.coverImage ?? '');
      formDataObj.append('content', formData.content);

      const result = await createPostAction(formDataObj);

      if (result.success && 'id' in result) {
        router.push(`/blog/${result.id}`);
      } else {
        if ('errors' in result && result.errors) {
          // Handle validation errors
          const errorMessages = result.errors.map((err: any) => `${err.field}: ${err.message}`).join(', ');
          alert(`Validation errors: ${errorMessages}`);
        } else {
          alert(`Error creating post: ${result.message}`);
        }
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
