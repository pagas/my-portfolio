import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  where,
  serverTimestamp,
  Timestamp 
} from 'firebase/firestore';
import { db } from './firebase';
import { BlogPost, BlogPostData } from '@/types/blog';

const POSTS_COLLECTION = 'posts';

// Convert Firestore document to BlogPost
function docToBlogPost(doc: any): BlogPost {
  const data = doc.data();
  return {
    id: doc.id,
    slug: data.slug,
    title: data.title,
    description: data.description,
    content: data.content,
    tags: data.tags || [],
    author: data.author,
    coverImage: data.coverImage || '',
    date: data.publishedAt?.toDate?.()?.toISOString().split('T')[0] || data.date,
    readingTime: calculateReadingTime(data.content),
  };
}

// Calculate reading time (200 words per minute)
function calculateReadingTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  const readingTime = Math.ceil(words / 200);
  return `${readingTime} min read`;
}

// Get all blog posts
export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const postsRef = collection(db, POSTS_COLLECTION);
    const q = query(postsRef, orderBy('publishedAt', 'desc'));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(docToBlogPost);
  } catch (error) {
    console.error('Error getting posts:', error);
    return [];
  }
}

// Get a single post by slug
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const postsRef = collection(db, POSTS_COLLECTION);
    const q = query(postsRef, where('slug', '==', slug));
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) {
      return null;
    }
    
    return docToBlogPost(snapshot.docs[0]);
  } catch (error) {
    console.error('Error getting post by slug:', error);
    return null;
  }
}

// Get related posts by tags
export async function getRelatedPosts(currentSlug: string, tags: string[], limit = 3): Promise<BlogPost[]> {
  try {
    if (tags.length === 0) return [];
    
    const postsRef = collection(db, POSTS_COLLECTION);
    const q = query(
      postsRef, 
      where('slug', '!=', currentSlug),
      orderBy('publishedAt', 'desc')
    );
    const snapshot = await getDocs(q);
    
    const allPosts = snapshot.docs.map(docToBlogPost);
    
    // Filter posts that share tags with the current post
    const relatedPosts = allPosts.filter(post => 
      post.tags.some(tag => tags.includes(tag))
    );
    
    return relatedPosts.slice(0, limit);
  } catch (error) {
    console.error('Error getting related posts:', error);
    return [];
  }
}

// Create a new blog post
export async function createPost(postData: BlogPostData): Promise<{ success: boolean; message: string; id?: string }> {
  try {
    // Generate slug from title
    const slug = postData.title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

    // Check if slug already exists
    const existingPost = await getPostBySlug(slug);
    if (existingPost) {
      return { success: false, message: 'A post with this title already exists' };
    }

    const postsRef = collection(db, POSTS_COLLECTION);
    const docRef = await addDoc(postsRef, {
      ...postData,
      slug,
      publishedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return { success: true, message: 'Post created successfully', id: docRef.id };
  } catch (error) {
    console.error('Error creating post:', error);
    return { success: false, message: 'Failed to create post' };
  }
}

// Update an existing blog post
export async function updatePost(slug: string, postData: Partial<BlogPostData>): Promise<{ success: boolean; message: string }> {
  try {
    const postsRef = collection(db, POSTS_COLLECTION);
    const q = query(postsRef, where('slug', '==', slug));
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) {
      return { success: false, message: 'Post not found' };
    }

    const docRef = doc(db, POSTS_COLLECTION, snapshot.docs[0].id);
    await updateDoc(docRef, {
      ...postData,
      updatedAt: serverTimestamp(),
    });

    return { success: true, message: 'Post updated successfully' };
  } catch (error) {
    console.error('Error updating post:', error);
    return { success: false, message: 'Failed to update post' };
  }
}

// Delete a blog post
export async function deletePost(slug: string): Promise<{ success: boolean; message: string }> {
  try {
    const postsRef = collection(db, POSTS_COLLECTION);
    const q = query(postsRef, where('slug', '==', slug));
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) {
      return { success: false, message: 'Post not found' };
    }

    const docRef = doc(db, POSTS_COLLECTION, snapshot.docs[0].id);
    await deleteDoc(docRef);

    return { success: true, message: 'Post deleted successfully' };
  } catch (error) {
    console.error('Error deleting post:', error);
    return { success: false, message: 'Failed to delete post' };
  }
}
