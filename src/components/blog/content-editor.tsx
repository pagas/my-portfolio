import { Eye } from "lucide-react";
import { MarkdownPreview } from "./markdown-preview";

interface ContentEditorProps {
  content: string;
  title: string;
  description: string;
  previewMode: boolean;
  onContentChange: (content: string) => void;
  onTogglePreview: () => void;
  error?: string;
}

export function ContentEditor({
  content,
  title,
  description,
  previewMode,
  onContentChange,
  onTogglePreview,
  error
}: ContentEditorProps) {
  return (
    <div className="bg-accent/30 rounded-xl p-8 border border-border">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Content</h2>
        <button
          type="button"
          onClick={onTogglePreview}
          className="flex items-center gap-2 px-4 py-2 bg-accent rounded-lg hover:bg-accent/80 transition-colors"
        >
          <Eye size={16} />
          {previewMode ? 'Edit' : 'Preview'}
        </button>
      </div>

      {previewMode ? (
        <MarkdownPreview 
          content={content}
          title={title}
          description={description}
        />
      ) : (
        <div>
          <textarea
            value={content}
            onChange={(e) => onContentChange(e.target.value)}
            className={`w-full px-4 py-3 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono ${
              error ? 'border-red-500' : 'border-border'
            }`}
            placeholder={`Write your blog post content in Markdown...

Examples:
# Heading 1
## Heading 2
### Heading 3

**Bold text**
*Italic text*

- List item 1
- List item 2

1. Numbered item 1
2. Numbered item 2

\`\`\`javascript
// Code block
const example = "Hello World";
\`\`\`

[Link text](https://example.com)

> Blockquote`}
            rows={20}
            required
          />
          {error && (
            <p className="text-red-500 text-sm mt-2">{error}</p>
          )}
        </div>
      )}
    </div>
  );
}
