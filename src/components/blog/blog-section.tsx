"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { BlogPost } from "@/lib/blog/blog";

interface BlogSectionProps {
  posts: BlogPost[];
}

export function BlogSection({ posts }: BlogSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Show only latest 3 posts on homepage
  const latestPosts = posts.slice(0, 3);

  if (latestPosts.length === 0) {
    return null;
  }

  return (
    <section id="blog" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Latest <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Blog Posts</span>
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Thoughts, tutorials, and insights about web development
          </p>
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {latestPosts.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link href={`/blog/${post.slug}`}>
                <motion.div
                  className="h-full bg-accent/30 rounded-xl overflow-hidden border border-border hover:border-blue-500/50 transition-all group"
                  whileHover={{ y: -5 }}
                >
                  {/* Cover Image or Gradient */}
                  {post.coverImage ? (
                    <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${post.coverImage})` }} />
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
                    <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>

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
                </motion.div>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* View All Button */}
        {posts.length > 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <Link href="/blog">
              <motion.button
                className="px-8 py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-xl transition-shadow inline-flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View All Posts
                <ArrowRight size={20} />
              </motion.button>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}


