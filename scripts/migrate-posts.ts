import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { createPost } from '../src/lib/firebase-blog';

const postsDirectory = path.join(process.cwd(), 'content/blog');

interface MigrationResult {
  fileName: string;
  title: string;
  success: boolean;
  message: string;
}

async function migratePosts() {
  console.log('🚀 Starting blog post migration to Firebase...\n');

  try {
    // Check if directory exists
    if (!fs.existsSync(postsDirectory)) {
      console.log('❌ No content/blog directory found');
      console.log('   Make sure you have MDX files in the content/blog folder');
      return;
    }

    const fileNames = fs.readdirSync(postsDirectory);
    const mdxFiles = fileNames.filter(file => file.endsWith('.mdx'));

    if (mdxFiles.length === 0) {
      console.log('❌ No MDX files found in content/blog directory');
      return;
    }

    console.log(`📁 Found ${mdxFiles.length} MDX files to migrate:`);
    mdxFiles.forEach(file => console.log(`   - ${file}`));
    console.log('');

    const results: MigrationResult[] = [];
    let successCount = 0;
    let failureCount = 0;

    for (const fileName of mdxFiles) {
      try {
        const slug = fileName.replace(/\.mdx$/, '');
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        const postData = {
          title: data.title || 'Untitled',
          description: data.description || '',
          tags: data.tags || [],
          author: data.author || 'Your Name',
          coverImage: data.coverImage || '',
          content: content,
        };

        console.log(`📝 Migrating: ${postData.title}...`);
        
        const result = await createPost(postData);
        
        if (result.success) {
          console.log(`   ✅ Successfully migrated: ${postData.title}`);
          results.push({
            fileName,
            title: postData.title,
            success: true,
            message: 'Successfully migrated'
          });
          successCount++;
        } else {
          console.log(`   ❌ Failed to migrate: ${postData.title} - ${result.message}`);
          results.push({
            fileName,
            title: postData.title,
            success: false,
            message: result.message
          });
          failureCount++;
        }
      } catch (error) {
        console.log(`   ❌ Error processing ${fileName}: ${error}`);
        results.push({
          fileName,
          title: 'Unknown',
          success: false,
          message: `Error: ${error}`
        });
        failureCount++;
      }
    }

    // Summary
    console.log('\n📊 Migration Summary:');
    console.log(`   ✅ Successfully migrated: ${successCount} posts`);
    console.log(`   ❌ Failed to migrate: ${failureCount} posts`);
    console.log(`   📁 Total files processed: ${mdxFiles.length}`);

    if (failureCount > 0) {
      console.log('\n❌ Failed migrations:');
      results
        .filter(r => !r.success)
        .forEach(r => console.log(`   - ${r.fileName}: ${r.message}`));
    }

    if (successCount > 0) {
      console.log('\n🎉 Migration completed successfully!');
      console.log('   Your blog posts are now stored in Firebase Firestore');
      console.log('   You can verify them in the Firebase Console');
    }

  } catch (error) {
    console.error('💥 Migration failed with error:', error);
  }
}

// Run the migration
migratePosts();
