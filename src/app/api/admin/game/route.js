import { NextResponse } from "next/server";
import { db } from "@/config/firebase";
import { collection, query, where, getDocs, updateDoc } from "firebase/firestore";

export async function PUT(request) {
  try {
    // Parse the request body
    const body = await request.json();

    // Extract the custom game ID and updated data
    const { id, ...updatedData } = body;

    if (!id) {
      return NextResponse.json({ error: "Game ID is required" }, { status: 400 });
    }

    // Query the collection to find the document with the matching custom ID
    const gamesCollectionRef = collection(db, "games");
    const gameQuery = query(gamesCollectionRef, where("id", "==", id));
    const querySnapshot = await getDocs(gameQuery);

    if (querySnapshot.empty) {
      return NextResponse.json({ error: "Game not found" }, { status: 404 });
    }

    // Get the document reference for the matching game
    const gameDocRef = querySnapshot.docs[0].ref;

    // Update the game document with the new data
    await updateDoc(gameDocRef, updatedData);

    return NextResponse.json({ message: "Game updated successfully" });
  } catch (error) {
    console.error("Error updating game:", error);
    return NextResponse.json({ error: "Failed to update game" }, { status: 500 });
  }
}
