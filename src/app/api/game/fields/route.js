import { collection, getDocs, writeBatch, query, orderBy } from "firebase/firestore";
import { db } from "@/config/firebase";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Get a reference to your collection
    const collectionRef = collection(db, "games");

    async function sync(parameter, field, size) {
      // Create the query with proper orderBy
      const gamesQuery = query(collectionRef, orderBy(parameter, "desc"));
      const querySnapshot = await getDocs(gamesQuery);
      
      // Initialize a batch
      const batch = writeBatch(db);
      
      // Counter to track games
      let count = 0;
      
      // Loop through documents
      querySnapshot.forEach((doc) => {
        const docRef = doc.ref;
        
        // Using dynamic field name in the update object
        const updateData = {
          [field]: count < size  // This is the fix - using computed property name
        };
        
        batch.update(docRef, updateData);
        count++;
      });
      
      // Commit the batch
      await batch.commit();
    }

    // Execute updates for different parameters and fields
    await sync("data.rating", "mostRated", 8);
    await sync("views", "trending", 10);
    await sync("views", "popular", 12);

    return NextResponse.json({ message: "Games synced" });
  } catch (error) {
    console.error("Error updating documents:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}