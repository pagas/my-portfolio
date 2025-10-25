import { db } from '@/lib/firebase/firebase';
import { collection, doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

export interface User {
  uid: string;
  email: string;
  displayName: string;
  slug: string;
  bio?: string;
  avatar?: string;
  createdAt: any;
  updatedAt: any;
}

const USERS_COLLECTION = 'users';

// Get or create user profile in Firestore
export async function getOrCreateUser(uid: string, email: string, name?: string): Promise<User> {
  const usersRef = collection(db, USERS_COLLECTION);
  const userDocRef = doc(usersRef, uid);
  
  try {
    // Try to get existing user
    const userDoc = await getDoc(userDocRef);
    
    if (userDoc.exists()) {
      const data = userDoc.data();
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
      // Create new user profile
      const displayName = name || email.split('@')[0] || 'Anonymous';
      const slug = email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '-');
      
      const newUser: Omit<User, 'uid'> = {
        email,
        displayName,
        slug,
        bio: '',
        avatar: '',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };
      
      await setDoc(userDocRef, newUser);
      
      return {
        uid,
        ...newUser,
      };
    }
  } catch (error) {
    console.error('Error getting/creating user:', error);
    // Fallback to basic user info
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

// Get user by UID
export async function getUserByUid(uid: string): Promise<User | null> {
  try {
    const usersRef = collection(db, USERS_COLLECTION);
    const userDocRef = doc(usersRef, uid);
    const userDoc = await getDoc(userDocRef);
    
    if (userDoc.exists()) {
      const data = userDoc.data();
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
    console.error('Error getting user:', error);
    return null;
  }
}
