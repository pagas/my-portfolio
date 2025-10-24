export interface BlogPostData {
  title: string;
  description: string;
  tags: string[];
  author: string;
  coverImage: string;
  content: string;
  date?: string;
}

export interface BlogPost extends BlogPostData {
  id: string;
  slug: string;
  readingTime: string;
  date: string;
}
