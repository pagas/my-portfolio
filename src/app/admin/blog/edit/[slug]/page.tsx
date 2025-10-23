"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Tag, User, Image, Save, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { MarkdownPreview } from "@/components/markdown-preview";

interface BlogPostData {
  title: string;
  description: string;
  tags: string[];
  author: string;
  coverImage: string;
  content: string;
  date: string;
}

interface EditBlogPostProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function EditBlogPost({ params }: EditBlogPostProps) {
  const router = useRouter();
  const { slug } = use(params);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [previewMode, setPreviewMode] = useState(false);
  const [formData, setFormData] = useState<BlogPostData>({
    title: "",
    description: "",
    tags: [],
    author: "Your Name",
    coverImage: "",
    content: "",
    date: "",
  });
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    // Load existing post data
    const loadPost = async () => {
      try {
        const response = await fetch(`/api/blog/${slug}`);
        if (response.ok) {
          const post = await response.json();
          setFormData({
            title: post.title,
            description: post.description,
            tags: post.tags,
            author: post.author,
            coverImage: post.coverImage || "",
            content: post.content,
            date: post.date,
          });
        } else {
          router.push('/admin/blog/manage');
        }
      } catch (error) {
        console.error('Error loading post:', error);
        router.push('/admin/blog/manage');
      } finally {
        setIsLoading(false);
      }
    };

    loadPost();
  }, [slug, router]);

  const handleInputChange = (field: keyof BlogPostData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const mdxContent = `---
title: "${formData.title}"
date: "${formData.date}"
description: "${formData.description}"
tags: [${formData.tags.map(tag => `"${tag}"`).join(', ')}]
author: "${formData.author}"
coverImage: "${formData.coverImage}"
---

${formData.content}`;

      const response = await fetch(`/api/blog/${slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: mdxContent,
        }),
      });

      if (response.ok) {
        router.push(`/blog/${slug}`);
      } else {
        const error = await response.json();
        alert(`Error updating post: ${error.message}`);
      }
    } catch (error) {
      console.error('Error updating blog post:', error);
      alert('Failed to update blog post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-lg text-foreground/60">Loading post...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl font-bold mb-4">
            <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Edit Post
            </span>
          </h1>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Update your blog post
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="bg-accent/30 rounded-xl p-8 border border-border">
              <h2 className="text-2xl font-bold mb-6">Basic Information</h2>
              
              <div className="space-y-6">
                {/* Title */}
                <div>
                  <label htmlFor="title" className="block text-sm font-medium mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your blog post title"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium mb-2">
                    Description *
                  </label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Brief description of your post"
                    rows={3}
                    required
                  />
                </div>

                {/* Author */}
                <div>
                  <label htmlFor="author" className="block text-sm font-medium mb-2">
                    Author
                  </label>
                  <input
                    type="text"
                    id="author"
                    value={formData.author}
                    onChange={(e) => handleInputChange('author', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>

                {/* Cover Image */}
                <div>
                  <label htmlFor="coverImage" className="block text-sm font-medium mb-2">
                    Cover Image URL
                  </label>
                  <input
                    type="url"
                    id="coverImage"
                    value={formData.coverImage}
                    onChange={(e) => handleInputChange('coverImage', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Tags
                  </label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="flex-1 px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Add a tag and press Enter"
                    />
                    <button
                      type="button"
                      onClick={handleAddTag}
                      className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-accent rounded-full text-sm flex items-center gap-2"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="text-foreground/60 hover:text-foreground"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="bg-accent/30 rounded-xl p-8 border border-border">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Content</h2>
                <button
                  type="button"
                  onClick={() => setPreviewMode(!previewMode)}
                  className="flex items-center gap-2 px-4 py-2 bg-accent rounded-lg hover:bg-accent/80 transition-colors"
                >
                  <Eye size={16} />
                  {previewMode ? 'Edit' : 'Preview'}
                </button>
              </div>

              {previewMode ? (
                <MarkdownPreview 
                  content={formData.content}
                  title={formData.title}
                  description={formData.description}
                />
              ) : (
                <textarea
                  value={formData.content}
                  onChange={(e) => handleInputChange('content', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
                  placeholder={`Write your blog post content in Markdown...

Examples:
# Heading 1
## Heading 2
### Heading 3

**Bold text**
*Italic text*

- List item 1
- List item 2

1. Numbered item 1
2. Numbered item 2

\`\`\`javascript
// Code block
const example = "Hello World";
\`\`\`

[Link text](https://example.com)

> Blockquote`}
                  rows={20}
                  required
                />
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-4 justify-end">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-3 border border-border rounded-lg hover:bg-accent transition-colors"
              >
                Cancel
              </button>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Save size={16} />
                {isSubmitting ? 'Updating...' : 'Update Post'}
              </motion.button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
