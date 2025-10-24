import { db } from '@/lib/firebase';
import { collection, doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

export interface Author {
  uid: string;
  email: string;
  displayName: string;
  slug: string;
  bio?: string;
  avatar?: string;
  createdAt: any;
  updatedAt: any;
}

const AUTHORS_COLLECTION = 'authors';

// Get or create author profile in Firestore
export async function getOrCreateAuthor(uid: string, email: string, name?: string): Promise<Author> {
  const authorsRef = collection(db, AUTHORS_COLLECTION);
  const authorDocRef = doc(authorsRef, uid);
  
  try {
    // Try to get existing author
    const authorDoc = await getDoc(authorDocRef);
    
    if (authorDoc.exists()) {
      const data = authorDoc.data();
      return {
        uid,
        email: data.email,
        displayName: data.displayName,
        slug: data.slug,
        bio: data.bio,
        avatar: data.avatar,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      };
    } else {
      // Create new author profile
      const displayName = name || email.split('@')[0] || 'Anonymous';
      const slug = email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '-');
      
      const newAuthor: Omit<Author, 'uid'> = {
        email,
        displayName,
        slug,
        bio: '',
        avatar: '',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };
      
      await setDoc(authorDocRef, newAuthor);
      
      return {
        uid,
        ...newAuthor,
      };
    }
  } catch (error) {
    console.error('Error getting/creating author:', error);
    // Fallback to basic author info
    return {
      uid,
      email,
      displayName: name || email.split('@')[0] || 'Anonymous',
      slug: email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '-'),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
  }
}

// Get author by UID
export async function getAuthorByUid(uid: string): Promise<Author | null> {
  try {
    const authorsRef = collection(db, AUTHORS_COLLECTION);
    const authorDocRef = doc(authorsRef, uid);
    const authorDoc = await getDoc(authorDocRef);
    
    if (authorDoc.exists()) {
      const data = authorDoc.data();
      return {
        uid,
        email: data.email,
        displayName: data.displayName,
        slug: data.slug,
        bio: data.bio,
        avatar: data.avatar,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error getting author:', error);
    return null;
  }
}
