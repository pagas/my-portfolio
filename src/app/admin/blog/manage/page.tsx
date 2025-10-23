import { getAllPosts } from "@/lib/blog";
import Link from "next/link";
import { Calendar, Clock, Edit, Eye } from "lucide-react";
import { Metadata } from "next";
import { DeleteButton } from "@/components/admin";
import { deletePost } from "@/lib/actions/blog-actions";

export const metadata: Metadata = {
  title: "Manage Blog Posts - Your Name",
  description: "Manage your blog posts",
};

export default function ManageBlogPosts() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl font-bold mb-4">
            <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Manage Posts
            </span>
          </h1>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Edit, delete, or update your existing blog posts
          </p>
        </div>

        {/* Posts List */}
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-foreground/60 mb-4">No blog posts found.</p>
            <Link 
              href="/admin/blog/new"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Your First Post
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <div key={post.slug} className="bg-accent/30 rounded-xl overflow-hidden border border-border hover:border-blue-500/50 transition-all">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
                      <p className="text-foreground/60 mb-4">{post.description}</p>
                      
                      {/* Meta Info */}
                      <div className="flex items-center gap-4 text-sm text-foreground/60 mb-4">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={14} />
                          {post.readingTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <Edit size={14} />
                          {post.author}
                        </span>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-accent text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 ml-4">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="p-2 rounded-lg hover:bg-accent transition-colors"
                        title="View Post"
                      >
                        <Eye size={16} />
                      </Link>
                      <Link
                        href={`/admin/blog/edit/${post.slug}`}
                        className="p-2 rounded-lg hover:bg-accent transition-colors"
                        title="Edit Post"
                      >
                        <Edit size={16} />
                      </Link>
                      <DeleteButton
                        slug={post.slug}
                        title={post.title}
                        onDelete={deletePost}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Back to Admin */}
        <div className="text-center mt-12">
          <Link 
            href="/admin"
            className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-lg hover:bg-accent transition-colors"
          >
            ← Back to Admin Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}
