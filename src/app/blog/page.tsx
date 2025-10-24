import { getAllPostsWithAuthors } from "@/lib/blog";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - Your Name",
  description: "Thoughts, tutorials, and insights about web development",
};

export default async function BlogPage() {
  const posts = await getAllPostsWithAuthors();

  return (
    <main className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl font-bold mb-4">
            <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Blog
            </span>
          </h1>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Thoughts, tutorials, and insights about web development, design, and technology
          </p>
        </div>

        {/* Blog Posts */}
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-foreground/60 mb-4">No blog posts yet.</p>
            <p className="text-foreground/40">
              Add your first post in the <code className="bg-accent px-2 py-1 rounded">content/blog</code> directory
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article key={post.slug}>
                <Link href={`/blog/${post.slug}`}>
                  <div className="h-full bg-accent/30 rounded-xl overflow-hidden border border-border hover:border-blue-500/50 transition-all group hover:-translate-y-1 duration-300">
                    {/* Cover Image or Gradient */}
                    {post.coverImage ? (
                      <div 
                        className="h-48 bg-cover bg-center" 
                        style={{ backgroundImage: `url(${post.coverImage})` }} 
                      />
                    ) : (
                      <div className="h-48 bg-linear-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                        <div className="text-6xl font-bold text-foreground/10">
                          {post.title.charAt(0)}
                        </div>
                      </div>
                    )}

                    {/* Post Content */}
                    <div className="p-6">
                      {/* Meta Info */}
                      <div className="flex items-center gap-4 text-xs text-foreground/60 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={14} />
                          {post.readingTime}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {post.title}
                      </h2>

                      {/* Description */}
                      <p className="text-foreground/60 text-sm mb-4 line-clamp-3">
                        {post.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-accent text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Read More */}
                      <div className="flex items-center gap-2 text-sm font-medium text-blue-600 group-hover:gap-3 transition-all">
                        Read More <ArrowRight size={16} />
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}


