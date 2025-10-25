"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";
import { motion } from "framer-motion";

// Custom hooks
import { useBlogPost } from "@/hooks/useBlogPost";
import { BlogPostData } from "@/schemas/blog";
import { useBlogForm } from "@/hooks/useBlogForm";
import { useBlogSubmit } from "@/hooks/useBlogSubmit";

// Components
import { LoadingSpinner, ErrorMessage, FormField } from "@/components/ui";
import { TagManager, ContentEditor } from "@/components/blog";

// Utils
import { validateBlogPost, getFieldError } from "@/utils/validation";

interface EditBlogPostProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function EditBlogPost({ params }: EditBlogPostProps) {
  const router = useRouter();
  const { slug } = use(params);
  const [previewMode, setPreviewMode] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  // Custom hooks
  const { post, isLoading, error: loadError, refetch } = useBlogPost(slug);
  const { submitPost, isSubmitting, error: submitError, clearError } = useBlogSubmit(slug);
  
  const {
    formData,
    tagInput,
    setTagInput,
    handleInputChange,
    handleAddTag,
    handleRemoveTag,
    handleKeyPress,
    resetForm,
  } = useBlogForm({
    title: "",
    description: "",
    tags: [],
    coverImage: "",
    content: "",
  });

  // Initialize form data when post loads
  useEffect(() => {
    if (post) {
      resetForm(post);
    }
  }, [post, resetForm]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    
    // Validate form
    const errors = validateBlogPost(formData);
    if (errors.length > 0) {
      setValidationErrors(errors.map(e => e.message));
      return;
    }
    
    setValidationErrors([]);
    await submitPost(formData);
  };

  if (isLoading) {
    return (
      <main className="min-h-screen pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <LoadingSpinner message="Loading post..." />
        </div>
      </main>
    );
  }

  if (loadError) {
    return (
      <main className="min-h-screen pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <ErrorMessage message={loadError} onRetry={refetch} />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl font-bold mb-4">
            <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Edit Post
            </span>
          </h1>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Update your blog post
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Error Messages */}
          {submitError && (
            <div className="mb-6">
              <ErrorMessage 
                message={submitError} 
                onDismiss={clearError}
              />
            </div>
          )}
          
          {validationErrors.length > 0 && (
            <div className="mb-6">
              <ErrorMessage 
                message={validationErrors.join(', ')} 
                onDismiss={() => setValidationErrors([])}
              />
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="bg-accent/30 rounded-xl p-8 border border-border">
              <h2 className="text-2xl font-bold mb-6">Basic Information</h2>
              
              <div className="space-y-6">
                <FormField
                  label="Title"
                  id="title"
                  value={formData.title}
                  onChange={(value) => handleInputChange('title', value)}
                  placeholder="Enter your blog post title"
                  required
                  error={getFieldError(validateBlogPost(formData), 'title')}
                />

                <FormField
                  label="Description"
                  id="description"
                  type="textarea"
                  value={formData.description}
                  onChange={(value) => handleInputChange('description', value)}
                  placeholder="Brief description of your post"
                  required
                  error={getFieldError(validateBlogPost(formData), 'description')}
                />

                <FormField
                  label="Author"
                  id="author"
                  value="Current User"
                  onChange={() => {}} // Read-only field
                  placeholder="Author is set automatically"
                />

                <FormField
                  label="Cover Image URL"
                  id="coverImage"
                  type="url"
                  value={formData.coverImage ?? ''}
                  onChange={(value) => handleInputChange('coverImage', value)}
                  placeholder="https://example.com/image.jpg"
                />

                <TagManager
                  tags={formData.tags ?? []}
                  tagInput={tagInput}
                  onTagInputChange={setTagInput}
                  onAddTag={handleAddTag}
                  onRemoveTag={handleRemoveTag}
                  onKeyPress={handleKeyPress}
                  error={getFieldError(validateBlogPost(formData), 'tags')}
                />
              </div>
            </div>

            <ContentEditor
              content={formData.content}
              title={formData.title}
              description={formData.description}
              previewMode={previewMode}
              onContentChange={(content) => handleInputChange('content', content)}
              onTogglePreview={() => setPreviewMode(!previewMode)}
              error={getFieldError(validateBlogPost(formData), 'content')}
            />

            {/* Actions */}
            <div className="flex gap-4 justify-end">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-3 border border-border rounded-lg hover:bg-accent transition-colors"
              >
                Cancel
              </button>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Save size={16} />
                {isSubmitting ? 'Updating...' : 'Update Post'}
              </motion.button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
