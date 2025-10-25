import { NextRequest, NextResponse } from 'next/server';
import { verifyFirebaseToken } from '@/lib/auth-utils';

export interface AuthenticatedUser {
  uid: string;
  email: string | undefined;
  name?: string;
  picture?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  timestamp: string;
}

export interface ApiError {
  type: 'VALIDATION_ERROR' | 'NOT_FOUND' | 'UNAUTHORIZED' | 'SERVER_ERROR' | 'FORBIDDEN';
  message: string;
  status: number;
}

// Standardized error responses
export function createErrorResponse(error: ApiError): NextResponse {
  return NextResponse.json(
    {
      success: false,
      error: error.type,
      message: error.message,
      timestamp: new Date().toISOString()
    },
    { status: error.status }
  );
}

// Standardized success responses
export function createSuccessResponse<T>(data?: T, message?: string): NextResponse {
  return NextResponse.json({
    success: true,
    data,
    message,
    timestamp: new Date().toISOString()
  });
}

// Authentication middleware
export async function authenticateRequest(request: NextRequest): Promise<{
  user: AuthenticatedUser | null;
  error: NextResponse | null;
}> {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return {
        user: null,
        error: createErrorResponse({
          type: 'UNAUTHORIZED',
          message: 'Authentication required',
          status: 401
        })
      };
    }

    const token = authHeader.split('Bearer ')[1];
    const authUser = await verifyFirebaseToken(token);
    
    if (!authUser) {
      return {
        user: null,
        error: createErrorResponse({
          type: 'UNAUTHORIZED',
          message: 'Invalid authentication token',
          status: 401
        })
      };
    }

    return {
      user: authUser,
      error: null
    };
  } catch (error) {
    console.error('Authentication error:', error);
    return {
      user: null,
      error: createErrorResponse({
        type: 'SERVER_ERROR',
        message: 'Authentication failed',
        status: 500
      })
    };
  }
}

// Higher-order function to wrap API handlers with authentication
export function withAuth<T extends any[]>(
  handler: (user: AuthenticatedUser, request: NextRequest, ...args: T) => Promise<NextResponse>
) {
  return async (request: NextRequest, ...args: T): Promise<NextResponse> => {
    const { user, error } = await authenticateRequest(request);
    
    if (error) {
      return error;
    }
    
    return handler(user!, request, ...args);
  };
}

// Higher-order function for optional authentication
export function withOptionalAuth<T extends any[]>(
  handler: (user: AuthenticatedUser | null, request: NextRequest, ...args: T) => Promise<NextResponse>
) {
  return async (request: NextRequest, ...args: T): Promise<NextResponse> => {
    const { user } = await authenticateRequest(request);
    return handler(user, request, ...args);
  };
}

// Input validation helper
export function validateRequestBody<T>(
  body: any,
  schema: { parse: (data: any) => T }
): { data: T | null; error: NextResponse | null } {
  try {
    const data = schema.parse(body);
    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: createErrorResponse({
        type: 'VALIDATION_ERROR',
        message: 'Invalid request data',
        status: 400
      })
    };
  }
}

// Common error handlers
export const ApiErrors = {
  validation: (message: string) => createErrorResponse({
    type: 'VALIDATION_ERROR',
    message,
    status: 400
  }),
  
  notFound: (message: string) => createErrorResponse({
    type: 'NOT_FOUND',
    message,
    status: 404
  }),
  
  unauthorized: (message: string = 'Authentication required') => createErrorResponse({
    type: 'UNAUTHORIZED',
    message,
    status: 401
  }),
  
  forbidden: (message: string = 'Access denied') => createErrorResponse({
    type: 'FORBIDDEN',
    message,
    status: 403
  }),
  
  serverError: (message: string = 'Internal server error') => createErrorResponse({
    type: 'SERVER_ERROR',
    message,
    status: 500
  })
};
