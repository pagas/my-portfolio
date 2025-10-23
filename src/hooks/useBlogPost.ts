import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

export interface BlogPostData {
  title: string;
  description: string;
  tags: string[];
  author: string;
  coverImage: string;
  content: string;
  date: string;
}

export function useBlogPost(slug: string) {
  const router = useRouter();
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPost = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch(`/api/blog/${slug}`);
      if (response.ok) {
        const data = await response.json();
        setPost({
          title: data.title,
          description: data.description,
          tags: data.tags,
          author: data.author,
          coverImage: data.coverImage || "",
          content: data.content,
          date: data.date,
        });
      } else {
        setError('Post not found');
        router.push('/admin/blog/manage');
      }
    } catch (err) {
      console.error('Error loading post:', err);
      setError('Failed to load post');
      router.push('/admin/blog/manage');
    } finally {
      setIsLoading(false);
    }
  }, [slug, router]);

  useEffect(() => {
    loadPost();
  }, [loadPost]);

  return { post, isLoading, error, refetch: loadPost };
}
