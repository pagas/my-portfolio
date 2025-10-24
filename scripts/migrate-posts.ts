import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { config } from 'dotenv';
import readingTime from 'reading-time';
import { initializeApp } from 'firebase/app';
import { 
  getFirestore,
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs,
  serverTimestamp 
} from 'firebase/firestore';

// Load environment variables
config({ path: '.env.local' });

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const postsDirectory = path.join(process.cwd(), 'content/blog');

interface MigrationResult {
  fileName: string;
  title: string;
  success: boolean;
  message: string;
}

// Custom createPost function for migration
async function createPostForMigration(postData: {
  title: string;
  description: string;
  tags: string[];
  author: string;
  coverImage: string;
  content: string;
}): Promise<{ success: boolean; message: string; id?: string }> {
  try {
    // Generate slug from title
    const slug = postData.title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

    // Check if slug already exists
    const postsRef = collection(db, 'posts');
    const q = query(postsRef, where('slug', '==', slug));
    const snapshot = await getDocs(q);
    
    if (!snapshot.empty) {
      return { success: false, message: 'A post with this title already exists' };
    }

    const docRef = await addDoc(postsRef, {
      ...postData,
      slug,
      readingTime: readingTime(postData.content).text,
      publishedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return { success: true, message: 'Post created successfully', id: slug };
  } catch (error) {
    console.error('Error creating post:', error);
    return { success: false, message: 'Failed to create post' };
  }
}

async function migratePosts() {
  console.log('🚀 Starting blog post migration to Firebase...\n');

  try {
    // Check if directory exists
    if (!fs.existsSync(postsDirectory)) {
      console.log('❌ No content/blog directory found');
      console.log('   Create the content/blog directory and add your MDX files there');
      console.log('   Then run this migration script again');
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
        
        const result = await createPostForMigration(postData);
        
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