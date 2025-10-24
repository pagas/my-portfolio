import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BlogPostData } from "@/types/blog";
import { useAuth } from "@/contexts/AuthContext";

export function useNewPostForm() {
  const router = useRouter();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [formData, setFormData] = useState<BlogPostData>({
    title: "",
    description: "",
    tags: [],
    author: user?.email || "Your Name",
    coverImage: "",
    content: "",
  });
  const [tagInput, setTagInput] = useState("");

  // Update author when user changes
  useEffect(() => {
    if (user?.email) {
      setFormData(prev => ({
        ...prev,
        author: user.email || "Your Name"
      }));
    }
  }, [user]);

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
      const response = await fetch('/api/blog/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await user?.getIdToken()}`,
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          tags: formData.tags,
          coverImage: formData.coverImage,
          content: formData.content,
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
