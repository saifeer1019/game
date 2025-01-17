import { NextResponse } from "next/server";
import { db } from "@/config/firebase";
import { collection, getDocs, query, where, limit, startAfter } from "firebase/firestore";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query_ = searchParams.get("query") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const operatingSystem = searchParams.get("operatingSystem") || "";
  const releaseYear = searchParams.get("releaseYear") || "";
  const rating = searchParams.get("rating") || "";
  const developer = searchParams.get("developer") || "";
  const category = searchParams.get("category") || "";

  const pageSize = 10;
  const gamesCollectionRef = collection(db, "games");

  try {
    let filters = [];

    if (query_) filters.push(where("data.gameName", "==", query_));
    if (operatingSystem) filters.push(where("operatingSystem", "==", operatingSystem));
    if (releaseYear) filters.push(where("releaseYear", "==", releaseYear));
    if (rating) filters.push(where("rating", "==", rating));
    if (developer) filters.push(where("developer", "==", developer));
    if (category) filters.push(where("category", "==", category));

  // Handle partial matching for the name
    let gamesQuery = query(gamesCollectionRef, ...filters);
    if (query_) {
      gamesQuery = query(
        gamesCollectionRef,
        ...filters,
        orderBy("data.gameName"),
        startAt(query_),
        endAt(query_ + "\uf8ff"), // Ensures partial matching
        limit(pageSize)
      );
    } else {
      gamesQuery = query(gamesCollectionRef, ...filters, orderBy("data.gameName"), limit(pageSize));
    }

    // Handle pagination using startAfter
    const querySnapshot = await getDocs(gamesQuery);
    const games = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    return NextResponse.json({
      games,
      totalPages: Math.ceil(querySnapshot.size / pageSize),
      currentPage: page,
    });
  } catch (error) {
    console.error("Error fetching games:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
