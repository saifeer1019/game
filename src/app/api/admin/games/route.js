import { NextResponse } from "next/server";
import { db } from "@/config/firebase";
import { collection, getDocs, query, orderBy, startAfter, limit, doc, getDoc } from "firebase/firestore";


export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const pageSize = parseInt(searchParams.get("limit")) || 10; // Default to 10 items per page
  const lastDocId = searchParams.get("lastDocId") || null;   // Optional: ID of the last document from the previous page



    const gamesCollection = collection(db, "games");

    let gamesQuery = query(gamesCollection, limit(pageSize));


    if (lastDocId) {
      // Retrieve the last document snapshot from the previous page
      const lastDocRef = doc(db, "games", lastDocId);
const lastDocSnapshot = await getDoc(lastDocRef);
      if (lastDocSnapshot.exists) {
        gamesQuery = query(gamesCollection,  startAfter(lastDocSnapshot), limit(pageSize));
      }
    }
      

    const snapshot = await getDocs(gamesQuery);
    const documents = [];

  // Add documents to the response array
  snapshot.forEach((doc) => {
    documents.push({ id: doc.id, ...doc.data() });
  });
  console.log(documents);
   // Get the ID of the last document for pagination
   const lastDoc = snapshot.docs[snapshot.docs.length - 1];
   const nextDocId = lastDoc ? lastDoc.id : null;


   return new NextResponse(JSON.stringify({ documents, nextDocId }), { status: 200 });
  }

      

 catch (error) {
    console.error("Error fetching games by categories:", error);
    return NextResponse.json({ error: "Failed to fetch games" }, { status: 500 });
  }
}
