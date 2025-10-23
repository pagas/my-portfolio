"use client";

import { PageHeader, BlogForm } from "@/components/admin";
import { useNewPostForm } from "@/hooks/useNewPostForm";

export default function CreateBlogPost() {
  const {
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
  } = useNewPostForm();

  return (
    <main className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <PageHeader 
          title="Create New Post"
          description="Write and publish a new blog post"
        />

        <div className="max-w-4xl mx-auto">
          <BlogForm
            formData={formData}
            tagInput={tagInput}
            previewMode={previewMode}
            isSubmitting={isSubmitting}
            onInputChange={handleInputChange}
            onTagInputChange={(value) => setTagInput(value)}
            onAddTag={handleAddTag}
            onRemoveTag={handleRemoveTag}
            onKeyPress={handleKeyPress}
            onTogglePreview={() => setPreviewMode(!previewMode)}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </main>
  );
}