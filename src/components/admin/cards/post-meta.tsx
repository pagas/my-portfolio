import { Calendar, Clock, Edit } from "lucide-react";

interface PostMetaProps {
  date: string;
  readingTime: string;
  author: string;
}

export function PostMeta({ date, readingTime, author }: PostMetaProps) {
  return (
    <div className="flex items-center gap-4 text-sm text-foreground/60 mb-4">
      <span className="flex items-center gap-1">
        <Calendar size={14} />
        {date}
      </span>
      <span className="flex items-center gap-1">
        <Clock size={14} />
        {readingTime}
      </span>
      <span className="flex items-center gap-1">
        <Edit size={14} />
        {author}
      </span>
    </div>
  );
}
