import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { collection,getDoc, getDocs, writeBatch, query, orderBy } from "firebase/firestore";
import { db } from "@/config/firebase";

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

  const admin = collection(db, "admin");
    
  try {
    const { token } = await request.json();
    const auth = initAdmin();
    const decodedToken = await auth.verifyIdToken(token);
    const email= decodedToken.email
    
    const adminQuery = query(admin, where("role", "==", "admin"));
    const querySnapshot = await getDoc(adminQuery);
    const emails = querySnapshot.docs.map((doc) => doc.data().email);
    if(emails.includes(email)){
      return Response.json({ 
        user: {
          uid: decodedToken.uid,
          email: decodedToken.email
        }
      });
    }
    else{
      throw new Error('Not an admin');
    };
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