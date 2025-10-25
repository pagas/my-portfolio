import { BlogPostData } from "@/schemas/blog";
import { FormField } from "@/components/ui";
import { TagManager } from "@/components/blog";
import { ContentEditor } from "@/components/blog";
import { FormSection } from "./form-section";
import { FormActions } from "./form-actions";

interface BlogFormProps {
  formData: BlogPostData;
  tagInput: string;
  previewMode: boolean;
  isSubmitting: boolean;
  onInputChange: (field: keyof BlogPostData, value: string) => void;
  onTagInputChange: (value: string) => void;
  onAddTag: () => void;
  onRemoveTag: (tag: string) => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  onTogglePreview: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function BlogForm({
  formData,
  tagInput,
  previewMode,
  isSubmitting,
  onInputChange,
  onTagInputChange,
  onAddTag,
  onRemoveTag,
  onKeyPress,
  onTogglePreview,
  onSubmit,
}: BlogFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <FormSection title="Basic Information">
        <FormField
          label="Title"
          id="title"
          value={formData.title}
          onChange={(value) => onInputChange('title', value)}
          placeholder="Enter your blog post title"
          required
        />

        <FormField
          label="Description"
          id="description"
          type="textarea"
          value={formData.description}
          onChange={(value) => onInputChange('description', value)}
          placeholder="Brief description of your post"
          required
        />

        <FormField
          label="Cover Image URL"
          id="coverImage"
          type="url"
          value={formData.coverImage ?? ''}
          onChange={(value) => onInputChange('coverImage', value)}
          placeholder="https://example.com/image.jpg"
        />

        <TagManager
          tags={formData.tags ?? []}
          tagInput={tagInput}
          onTagInputChange={onTagInputChange}
          onAddTag={onAddTag}
          onRemoveTag={onRemoveTag}
          onKeyPress={onKeyPress}
        />
      </FormSection>

      <ContentEditor
        content={formData.content}
        title={formData.title}
        description={formData.description}
        previewMode={previewMode}
        onContentChange={(content) => onInputChange('content', content)}
        onTogglePreview={onTogglePreview}
      />

      <FormActions isSubmitting={isSubmitting} submitLabel="Create Post" />
    </form>
  );
}
