import { collection, getDocs, writeBatch, query } from "firebase/firestore";
import { db } from "@/config/firebase";
import { NextResponse } from "next/server";

export async function GET() {


    try {
          // Get a reference to your collection
          const collectionRef = collection(db, "games");
      
          // Fetch all documents in the collection
          const querySnapshot = await getDocs(collectionRef);

                // Fetch all documents sorted by rating in descending order
                // const gamesQuery = query(collectionRef, orderBy("rating", "desc"));
                // const querySnapshot = await getDocs(gamesQuery);
                  
          // Initialize a batch
          const batch = writeBatch(db);
      
          // Counter to track top 8 games
        //  let count = 0;

                // Loop through documents
      // querySnapshot.forEach((doc) => {
      //   const docRef = doc.ref;

        // Set `mostRated: true` for top 8, and `mostRated: false` for the rest
        // batch.update(docRef, {
        //   mostRated: count < 8, // true for top 8 games
        // });

      //   count++;
      // });
          // Loop through documents and add the `featured` field
          querySnapshot.forEach((doc) => {
            const docRef = doc.ref;
            batch.update(docRef, { views:0 });
          });
      
        // Commit the batch
        await batch.commit();
        return NextResponse.json({ message: "Games added successfully" });
        console.log("Field `featured` added to all documents successfully.");
      } catch (error) {
        console.error("Error updating documents:", error);
      }
    }