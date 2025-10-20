import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { format } from "date-fns";

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  author: string;
  readingTime: string;
  coverImage?: string;
  content?: string;
}

const postsDirectory = path.join(process.cwd(), "content/blog");

export function getAllPosts(): BlogPost[] {
  // Create directory if it doesn't exist
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      // Calculate reading time (rough estimate: 200 words per minute)
      const words = content.trim().split(/\s+/).length;
      const readingTime = Math.ceil(words / 200);

      return {
        slug,
        title: data.title || "Untitled",
        date: data.date
          ? format(new Date(data.date), "MMMM d, yyyy")
          : "No date",
        description: data.description || "",
        tags: data.tags || [],
        author: data.author || "Your Name",
        readingTime: `${readingTime} min read`,
        coverImage: data.coverImage,
      } as BlogPost;
    });

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    // Calculate reading time
    const words = content.trim().split(/\s+/).length;
    const readingTime = Math.ceil(words / 200);

    return {
      slug,
      title: data.title || "Untitled",
      date: data.date
        ? format(new Date(data.date), "MMMM d, yyyy")
        : "No date",
      description: data.description || "",
      tags: data.tags || [],
      author: data.author || "Your Name",
      readingTime: `${readingTime} min read`,
      coverImage: data.coverImage,
      content,
    };
  } catch (error) {
    return null;
  }
}

export function getRelatedPosts(currentSlug: string, tags: string[], limit = 3): BlogPost[] {
  const allPosts = getAllPosts();
  
  // Filter out current post and find posts with matching tags
  const relatedPosts = allPosts
    .filter((post) => post.slug !== currentSlug)
    .map((post) => {
      const matchingTags = post.tags.filter((tag) => tags.includes(tag));
      return { post, matchCount: matchingTags.length };
    })
    .filter((item) => item.matchCount > 0)
    .sort((a, b) => b.matchCount - a.matchCount)
    .slice(0, limit)
    .map((item) => item.post);

  return relatedPosts;
}


