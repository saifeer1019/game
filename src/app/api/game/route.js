import { NextResponse } from "next/server";
import { db } from "@/config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  // Reference to the game document
  const gameDocRef = doc(db, "games", id);

  try {
    // Fetch the game document
    const gameDoc = await getDoc(gameDocRef);

    if (gameDoc.exists()) {
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
