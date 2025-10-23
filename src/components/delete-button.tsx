"use client";

import { Trash2 } from "lucide-react";

interface DeleteButtonProps {
  slug: string;
  title: string;
  onDelete: (slug: string) => Promise<{ success: boolean; message: string }>;
}

export function DeleteButton({ slug, title, onDelete }: DeleteButtonProps) {
  const handleDelete = async () => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      const result = await onDelete(slug);
      if (!result.success) {
        alert(result.message);
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="p-2 rounded-lg hover:bg-red-500/20 transition-colors text-red-500"
      title="Delete Post"
    >
      <Trash2 size={16} />
    </button>
  );
}
