import { NextResponse } from "next/server";
import { db } from "@/config/firebase";
import {collection, getDocs, updateDoc, query, where } from "firebase/firestore";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const slug_ = searchParams.get("slug");
  const gamesCollectionRef = collection(db, "games");
  // Reference to the game document
  const gameQuery = query(gamesCollectionRef, where("slug", "==", slug_));

  try {
    // Fetch the game documents
    const querySnapshot = await getDocs(gameQuery);

    if (!querySnapshot.empty) {
      const gameDoc = querySnapshot.docs[0];
      const gameDocRef = gameDoc.ref;

      // Increment the views field
      await updateDoc(gameDocRef, {
        views: (gameDoc.data().views || 0) + 1,
      });

      // Return the game data
      return NextResponse.json(gameDoc.data());
    } else {
      return NextResponse.json({ error: "Game not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching or updating game:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
