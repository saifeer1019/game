import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

// Initialize Firebase Admin
const initAdmin = () => {
  if (!getApps().length) {
    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
        clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });
  }
  return getAuth();
};

export async function POST(request) {
  try {
    const { token } = await request.json();
    const auth = initAdmin();
    const decodedToken = await auth.verifyIdToken(token);
    
    return Response.json({ 
      user: {
        uid: decodedToken.uid,
        email: decodedToken.email
      }
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 401 });
  }
}

export async function GET(request) {
  try {
    const token = request.headers.get('Authorization')?.split('Bearer ')[1];

    if (!token) {
      throw new Error('No token provided');
    }

    const auth = initAdmin();
    const decodedToken = await auth.verifyIdToken(token);
    
    return Response.json({ 
      user: {
        uid: decodedToken.uid,
        email: decodedToken.email
      }
    });
  } catch (error) {
    console.error(error);
    return Response.json({ error: error.message }, { status: 401 });
  }
}