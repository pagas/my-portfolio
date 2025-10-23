import Link from "next/link";

export function EmptyState() {
  return (
    <div className="text-center py-20">
      <p className="text-xl text-foreground/60 mb-4">No blog posts found.</p>
      <Link 
        href="/admin/blog/new"
        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Create Your First Post
      </Link>
    </div>
  );
}
