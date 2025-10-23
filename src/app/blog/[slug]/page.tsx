import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/blog";
import { Calendar, Clock, ArrowLeft, Tag } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { MarkdownPreview } from "@/components/blog";
import { use } from "react";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  
  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} - Your Name`,
    description: post.description,
    keywords: post.tags,
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = use(params);
  const post = getPostBySlug(slug);

  if (!post || !post.content) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(slug, post.tags);

  return (
    <main className="min-h-screen pt-20">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Back Button */}
        <Link 
          href="/blog"
          className="inline-flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          Back to Blog
        </Link>

        {/* Cover Image */}
        {post.coverImage && (
          <div 
            className="w-full h-64 sm:h-96 rounded-xl bg-cover bg-center mb-8"
            style={{ backgroundImage: `url(${post.coverImage})` }}
          />
        )}

        {/* Post Header */}
        <header className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {post.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-foreground/60 mb-4">
            <span className="flex items-center gap-2">
              <Calendar size={16} />
              {post.date}
            </span>
            <span className="flex items-center gap-2">
              <Clock size={16} />
              {post.readingTime}
            </span>
            <span>By {post.author}</span>
          </div>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <Tag size={16} className="text-foreground/60" />
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-accent text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Post Content */}
        <MarkdownPreview content={post.content} />

        {/* Divider */}
        <hr className="my-12 border-border" />

        {/* Author Bio */}
        <div className="bg-accent/30 rounded-xl p-6 mb-12">
          <h3 className="text-xl font-bold mb-2">About the Author</h3>
          <p className="text-foreground/70 mb-4">
            {post.author} is a full-stack developer passionate about creating amazing web experiences.
            Follow them on social media for more insights.
          </p>
          <div className="flex gap-4">
            <Link href="https://github.com" className="text-blue-600 hover:underline">
              GitHub
            </Link>
            <Link href="https://linkedin.com" className="text-blue-600 hover:underline">
              LinkedIn
            </Link>
            <Link href="https://twitter.com" className="text-blue-600 hover:underline">
              Twitter
            </Link>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold mb-8">Related Posts</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`}>
                  <div className="bg-accent/30 rounded-xl p-4 border border-border hover:border-blue-500/50 transition-all hover:-translate-y-1 duration-300">
                    <h3 className="font-bold mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-foreground/60 line-clamp-2 mb-2">
                      {relatedPost.description}
                    </p>
                    <span className="text-xs text-foreground/40">{relatedPost.date}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </main>
  );
}


