import Link from "next/link";
import { Edit, Eye } from "lucide-react";
import { DeleteButton } from "./delete-button";
import { deletePost } from "@/lib/actions/blog-actions";

interface PostActionsProps {
  slug: string;
  title: string;
}

export function PostActions({ slug, title }: PostActionsProps) {
  return (
    <div className="flex gap-2 ml-4">
      <Link
        href={`/blog/${slug}`}
        className="p-2 rounded-lg hover:bg-accent transition-colors"
        title="View Post"
      >
        <Eye size={16} />
      </Link>
      <Link
        href={`/admin/blog/edit/${slug}`}
        className="p-2 rounded-lg hover:bg-accent transition-colors"
        title="Edit Post"
      >
        <Edit size={16} />
      </Link>
      <DeleteButton
        slug={slug}
        title={title}
        onDelete={deletePost}
      />
    </div>
  );
}
