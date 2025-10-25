import { getAllPosts } from "@/lib/blog/blog";
import { Metadata } from "next";
import { EmptyState, BlogPostCard, PageHeader, BackButton } from "@/components/admin";

export const metadata: Metadata = {
  title: "Manage Blog Posts - Your Name",
  description: "Manage your blog posts",
};

export default async function ManageBlogPosts() {
  const posts = await getAllPosts();

  return (
    <main className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <PageHeader 
          title="Manage Posts"
          description="Edit, delete, or update your existing blog posts"
        />

        {/* Posts List */}
        {posts.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </div>
        )}

        <BackButton href="/admin">
          ← Back to Admin Dashboard
        </BackButton>
      </div>
    </main>
  );
}
