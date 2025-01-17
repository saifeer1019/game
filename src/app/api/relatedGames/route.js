import { NextResponse } from "next/server";
import { db } from "@/config/firebase";
import { collection, getDocs, query, where, orderBy, limit } from "firebase/firestore";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const genre_ = searchParams.get("genre");
  console.log(genre_);

  if (!genre_) {
    return NextResponse.json({ error: "Genre is required" }, { status: 400 });
  }

  const gamesCollectionRef = collection(db, "games");

  // Query to fetch games where the genre array contains the specified genre
  const gameQuery = query(
    gamesCollectionRef,
    where("data.genre", "array-contains", genre_), // Use `array-contains` for array fields
    orderBy("data.rating", "desc"), // Sort by rating in descending order
    limit(6) // Limit to 6 results
  );

  try {
    // Fetch the game documents
    const querySnapshot = await getDocs(gameQuery);

    if (!querySnapshot.empty) {
      // Collect data from the query results
      const games = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      return NextResponse.json(games);
    } else {
      return NextResponse.json({ error: "No games found for the specified genre" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching games:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
