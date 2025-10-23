"use client";

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css'; // Dark theme for syntax highlighting

interface MarkdownPreviewProps {
  content: string;
  title?: string;
  description?: string;
}

export function MarkdownPreview({ content, title, description }: MarkdownPreviewProps) {
  return (
    <div className="prose prose-lg max-w-none">
      <div className="bg-background p-6 rounded-lg border border-border">
        {title && (
          <h1 className="text-3xl font-bold mb-4">{title}</h1>
        )}
        {description && (
          <p className="text-foreground/60 mb-4">{description}</p>
        )}
        <div className="border-t border-border pt-4">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={{
              h1: ({ children }) => (
                <h1 className="text-4xl font-bold mt-8 mb-4 bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-3xl font-bold mt-6 mb-3">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-2xl font-semibold mt-5 mb-2">{children}</h3>
              ),
              p: ({ children }) => (
                <p className="text-foreground/80 leading-relaxed mb-4">{children}</p>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>
              ),
              li: ({ children }) => <li className="text-foreground/80">{children}</li>,
              code: ({ children, className }) => {
                const isInline = !className;
                return isInline ? (
                  <code className="bg-accent px-2 py-1 rounded text-sm font-mono">
                    {children}
                  </code>
                ) : (
                  <code className={className}>{children}</code>
                );
              },
              pre: ({ children }) => (
                <pre className="bg-accent p-4 rounded-lg overflow-x-auto mb-4 border border-border">
                  {children}
                </pre>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-blue-600 pl-4 italic my-4 text-foreground/70">
                  {children}
                </blockquote>
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  className="text-blue-600 hover:text-blue-700 underline transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {children}
                </a>
              ),
              table: ({ children }) => (
                <div className="overflow-x-auto mb-4">
                  <table className="min-w-full border border-border rounded-lg">
                    {children}
                  </table>
                </div>
              ),
              th: ({ children }) => (
                <th className="px-4 py-2 border-b border-border bg-accent font-semibold text-left">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="px-4 py-2 border-b border-border">
                  {children}
                </td>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
