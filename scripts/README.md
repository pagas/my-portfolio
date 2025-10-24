# Blog Migration Script

This script migrates your existing MDX blog posts from the `content/blog` folder to Firebase Firestore.

## Prerequisites

1. **Firebase Project Setup**
   - Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
   - Enable Firestore Database
   - Get your Firebase configuration

2. **Environment Variables**
   - Create `.env.local` file with your Firebase config:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

3. **MDX Files**
   - Ensure you have MDX files in `content/blog/` folder
   - Files should have frontmatter with title, description, tags, etc.

## Running the Migration

### Option 1: Using npm script (Recommended)
```bash
pnpm migrate
```

### Option 2: Direct execution
```bash
npx tsx scripts/migrate-posts.ts
```

## What the Script Does

1. **Scans** the `content/blog` directory for `.mdx` files
2. **Parses** each file using `gray-matter` to extract frontmatter and content
3. **Creates** blog posts in Firebase Firestore with the following structure:
   ```typescript
   {
     title: string,
     description: string,
     tags: string[],
     author: string,
     coverImage: string,
     content: string,
     slug: string, // auto-generated from title
     publishedAt: Timestamp,
     createdAt: Timestamp,
     updatedAt: Timestamp
   }
   ```
4. **Reports** success/failure for each file
5. **Provides** a summary of the migration

## Example Output

```
🚀 Starting blog post migration to Firebase...

📁 Found 3 MDX files to migrate:
   - getting-started-with-nextjs.mdx
   - mastering-typescript.mdx
   - modern-css-with-tailwind.mdx

📝 Migrating: Getting Started with Next.js...
   ✅ Successfully migrated: Getting Started with Next.js
📝 Migrating: Mastering TypeScript...
   ✅ Successfully migrated: Mastering TypeScript
📝 Migrating: Modern CSS with Tailwind...
   ✅ Successfully migrated: Modern CSS with Tailwind

📊 Migration Summary:
   ✅ Successfully migrated: 3 posts
   ❌ Failed to migrate: 0 posts
   📁 Total files processed: 3

🎉 Migration completed successfully!
   Your blog posts are now stored in Firebase Firestore
   You can verify them in the Firebase Console
```

## Troubleshooting

### Common Issues

1. **"No content/blog directory found"**
   - Make sure you have a `content/blog` folder with MDX files

2. **"No MDX files found"**
   - Ensure your files have `.mdx` extension

3. **Firebase connection errors**
   - Check your `.env.local` file has correct Firebase config
   - Verify Firebase project is set up correctly
   - Ensure Firestore is enabled

4. **"A post with this title already exists"**
   - The script will skip posts that already exist in Firebase
   - This prevents duplicate posts

### After Migration

1. **Verify** posts in Firebase Console
2. **Test** your blog functionality
3. **Backup** original MDX files (move to `content/blog-backup/`)
4. **Update** any hardcoded references to file paths

## Safety Features

- ✅ **Non-destructive** - Original MDX files are not modified
- ✅ **Duplicate prevention** - Won't create posts with existing titles
- ✅ **Error handling** - Continues processing even if one file fails
- ✅ **Detailed logging** - Shows exactly what happened with each file

## Rollback

If you need to rollback:
1. Delete posts from Firebase Console
2. Your original MDX files are still intact
3. Revert to file-based system by updating imports
