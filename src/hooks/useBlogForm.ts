import { useState, useCallback } from "react";
import { BlogPostData } from "./useBlogPost";

export function useBlogForm(initialData: BlogPostData) {
  const [formData, setFormData] = useState<BlogPostData>(initialData);
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

  const resetForm = useCallback((newData: BlogPostData) => {
    setFormData(newData);
    setTagInput("");
  }, []);

  return {
    formData,
    tagInput,
    setTagInput,
    handleInputChange,
    handleAddTag,
    handleRemoveTag,
    handleKeyPress,
    resetForm,
  };
}
