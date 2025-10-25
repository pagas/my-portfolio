import { cookies } from 'next/headers';
import { verifyFirebaseToken } from '@/lib/auth-utils';

export interface AuthenticatedUser {
  uid: string;
  email: string | undefined;
  name?: string;
  picture?: string;
}

export async function getAuthenticatedUser(): Promise<AuthenticatedUser | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token')?.value;
    
    if (!token) {
      return null;
    }

    const authUser = await verifyFirebaseToken(token);
    return authUser;
  } catch (error) {
    console.error('Error authenticating user:', error);
    return null;
  }
}

export async function requireAuth(): Promise<AuthenticatedUser> {
  const user = await getAuthenticatedUser();
  if (!user) {
    throw new Error('Authentication required');
  }
  return user;
}
