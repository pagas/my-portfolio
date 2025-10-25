import { PostMeta } from "./post-meta";
import { PostActions } from "./post-actions";
import { BlogPost } from "@/schemas/blog";

interface BlogPostCardProps {
  post: BlogPost;
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <div className="bg-accent/30 rounded-xl overflow-hidden border border-border hover:border-blue-500/50 transition-all">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
            <p className="text-foreground/60 mb-4">{post.description}</p>
            
            <PostMeta 
              date={post.date}
              readingTime={post.readingTime}
              author={post.authorId}
            />

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags?.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-accent text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <PostActions slug={post.slug} title={post.title} />
        </div>
      </div>
    </div>
  );
}
