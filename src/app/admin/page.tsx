import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard - Your Name",
  description: "Admin dashboard for managing blog posts",
};

export default function AdminDashboard() {
  return (
    <main className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl font-bold mb-4">
            <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Admin Dashboard
            </span>
          </h1>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Manage your blog posts and content
          </p>
        </div>

        {/* Admin Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Link href="/admin/blog/new">
            <div className="h-full bg-accent/30 rounded-xl overflow-hidden border border-border hover:border-blue-500/50 transition-all group hover:-translate-y-1 duration-300 p-8">
              <div className="text-center">
                <div className="text-6xl font-bold text-foreground/10 mb-4 group-hover:text-blue-600/20 transition-colors">
                  ✍️
                </div>
                <h2 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                  Create New Post
                </h2>
                <p className="text-foreground/60 text-sm">
                  Write and publish a new blog post
                </p>
              </div>
            </div>
          </Link>

          <Link href="/admin/blog/manage">
            <div className="h-full bg-accent/30 rounded-xl overflow-hidden border border-border hover:border-blue-500/50 transition-all group hover:-translate-y-1 duration-300 p-8">
              <div className="text-center">
                <div className="text-6xl font-bold text-foreground/10 mb-4 group-hover:text-blue-600/20 transition-colors">
                  📝
                </div>
                <h2 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                  Manage Posts
                </h2>
                <p className="text-foreground/60 text-sm">
                  Edit, delete, or update existing posts
                </p>
              </div>
            </div>
          </Link>

          <Link href="/blog">
            <div className="h-full bg-accent/30 rounded-xl overflow-hidden border border-border hover:border-blue-500/50 transition-all group hover:-translate-y-1 duration-300 p-8">
              <div className="text-center">
                <div className="text-6xl font-bold text-foreground/10 mb-4 group-hover:text-blue-600/20 transition-colors">
                  👁️
                </div>
                <h2 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                  View Blog
                </h2>
                <p className="text-foreground/60 text-sm">
                  See how your blog looks to visitors
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
