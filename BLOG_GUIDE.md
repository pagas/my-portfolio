# Blog System Guide

Your portfolio now includes a fully functional blog system with MDX support! 🎉

## 📁 Project Structure

```
my-portfolio/
├── content/
│   └── blog/              # Your MDX blog posts go here
│       ├── getting-started-with-nextjs.mdx
│       ├── mastering-typescript.mdx
│       └── modern-css-with-tailwind.mdx
├── src/
│   ├── app/
│   │   ├── blog/
│   │   │   ├── page.tsx           # Blog listing page (/blog)
│   │   │   ├── [slug]/page.tsx    # Individual blog post page
│   │   │   └── layout.tsx         # Blog layout with nav & footer
│   │   └── page.tsx               # Homepage (includes blog section)
│   ├── components/
│   │   └── blog-section.tsx       # Blog section for homepage
│   └── lib/
│       └── blog.ts                # Blog utility functions
├── mdx-components.tsx             # MDX component styling
└── next.config.ts                 # Next.js config with MDX support
```

## ✨ Features

- ✅ **MDX Support** - Write blog posts in Markdown with React components
- ✅ **Automatic Metadata** - Frontmatter for title, date, tags, etc.
- ✅ **Reading Time** - Automatically calculated
- ✅ **Related Posts** - Based on matching tags
- ✅ **SEO Optimized** - Proper meta tags for each post
- ✅ **Responsive Design** - Beautiful on all devices
- ✅ **Dark Mode** - Automatically adapts
- ✅ **Syntax Highlighting** - Styled code blocks

## 📝 Writing a New Blog Post

### 1. Create a New MDX File

Create a file in `content/blog/` with a `.mdx` extension:

```bash
content/blog/my-awesome-post.mdx
```

### 2. Add Frontmatter

Start your file with YAML frontmatter:

```mdx
---
title: "My Awesome Blog Post"
date: "2024-10-20"
description: "A short description of your post for SEO and previews"
tags: ["Next.js", "React", "Tutorial"]
author: "Your Name"
coverImage: "/images/blog/my-post-cover.jpg"  # Optional
---

# Your Content Starts Here

Write your blog post content using Markdown...
```

### 3. Required Frontmatter Fields

- **title**: Post title (string)
- **date**: Publication date (YYYY-MM-DD format)
- **description**: Brief description (string)
- **tags**: Array of tags (array of strings)
- **author**: Author name (string)
- **coverImage**: Optional cover image path (string)

## 📐 MDX Features

### Use React Components

```mdx
# Regular Markdown

You can use **bold**, *italic*, and `code` as usual.

## But Also Custom Components!

<CustomButton onClick={() => alert('Hello!')}>
  Click Me
</CustomButton>
```

### Styled Elements

All MDX elements are automatically styled (see `mdx-components.tsx`):

- Headings (h1, h2, h3)
- Paragraphs
- Lists (ul, ol)
- Code blocks
- Blockquotes
- Links

### Code Blocks

Use triple backticks for code:

\`\`\`typescript
const greeting = "Hello World";
console.log(greeting);
\`\`\`

## 🎨 Customization

### Modify Blog Styling

Edit `src/components/blog-section.tsx` and `src/app/blog/page.tsx` to customize:
- Card layouts
- Colors
- Spacing
- Animations

### Customize MDX Components

Edit `mdx-components.tsx` to style your content:

```tsx
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="your-custom-classes">{children}</h1>
    ),
    // ... more customizations
  };
}
```

### Add Cover Images

1. Place images in `public/images/blog/`
2. Reference in frontmatter: `coverImage: "/images/blog/my-image.jpg"`

## 📄 Pages

### Homepage Blog Section
- Shows latest 3 blog posts
- Located in: `src/components/blog-section.tsx`
- Included in: `src/app/page.tsx`

### Blog Listing Page (`/blog`)
- Shows all blog posts
- Grid layout
- Located in: `src/app/blog/page.tsx`

### Individual Post Page (`/blog/[slug]`)
- Full blog post content
- Related posts section
- Author bio
- Located in: `src/app/blog/[slug]/page.tsx`

## 🔧 Utility Functions

Located in `src/lib/blog.ts`:

- `getAllPosts()` - Get all blog posts
- `getPostBySlug(slug)` - Get a specific post
- `getRelatedPosts(slug, tags, limit)` - Get related posts

## 🚀 Deployment

Your blog posts are statically generated at build time:

```bash
pnpm build
```

All blog pages are pre-rendered for optimal performance!

## 💡 Tips

1. **Keep URLs Clean**: Use kebab-case for file names (e.g., `my-awesome-post.mdx`)
2. **Add Tags**: Use consistent tags to power related posts
3. **Write Good Descriptions**: They appear in previews and SEO
4. **Use Dates Consistently**: YYYY-MM-DD format
5. **Test Locally**: Run `pnpm dev` to preview changes

## 🎯 Next Steps

- Write your first blog post
- Customize the styling to match your brand
- Add more MDX components
- Set up RSS feed (optional)
- Add social sharing buttons (optional)
- Implement search functionality (optional)

---

Happy blogging! 📝✨

