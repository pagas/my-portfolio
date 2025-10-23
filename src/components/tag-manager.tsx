import { Tag } from "lucide-react";

interface TagManagerProps {
  tags: string[];
  tagInput: string;
  onTagInputChange: (value: string) => void;
  onAddTag: () => void;
  onRemoveTag: (tag: string) => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  error?: string;
}

export function TagManager({
  tags,
  tagInput,
  onTagInputChange,
  onAddTag,
  onRemoveTag,
  onKeyPress,
  error
}: TagManagerProps) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        Tags
      </label>
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          value={tagInput}
          onChange={(e) => onTagInputChange(e.target.value)}
          onKeyPress={onKeyPress}
          className={`flex-1 px-4 py-3 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            error ? 'border-red-500' : 'border-border'
          }`}
          placeholder="Add a tag and press Enter"
        />
        <button
          type="button"
          onClick={onAddTag}
          className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Tag size={16} />
          Add
        </button>
      </div>
      {error && (
        <p className="text-red-500 text-sm mb-2">{error}</p>
      )}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 bg-accent rounded-full text-sm flex items-center gap-2"
          >
            {tag}
            <button
              type="button"
              onClick={() => onRemoveTag(tag)}
              className="text-foreground/60 hover:text-foreground transition-colors"
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
