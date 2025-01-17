import { NextResponse } from "next/server";
import { db } from "@/config/firebase";
import { 
  collection, 
  getDocs, 
  query, 
  where, 
  limit, 
  startAfter,
  orderBy
} from "firebase/firestore";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const searchQuery = searchParams.get("query") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const operatingSystem = searchParams.get("operatingSystem") || "";
  const releaseYear = searchParams.get("releaseYear") || "";
  const rating = searchParams.get("rating") || "";
  const developer = searchParams.get("developer") || "";
  const category = searchParams.get("category") || "";

  console.log('Search Parameters:', {
    searchQuery,
    page,
    operatingSystem,
    releaseYear,
    rating,
    developer,
    category
  });

  const pageSize = 10;
  const gamesCollectionRef = collection(db, "games");

  try {
    let queryConstraints = [];
    
    // Only proceed with search if there's actually a query
    if (searchQuery.trim()) {
      const lowercaseQuery = searchQuery.toLowerCase().trim();
      console.log('Searching for keyword:', lowercaseQuery);
      
      queryConstraints.push(where("gameNameKeywords", "array-contains", lowercaseQuery));
    }

    // Add other filters
    if (operatingSystem) queryConstraints.push(where("operatingSystem", "==", operatingSystem));
    if (releaseYear) queryConstraints.push(where("releaseYear", "==", parseInt(releaseYear)));
    if (rating) queryConstraints.push(where("rating", "==", parseFloat(rating)));
    if (developer) queryConstraints.push(where("developer", "==", developer));
    if (category) queryConstraints.push(where("category", "==", category));

    // Add orderBy and limit
    queryConstraints.push(orderBy("data.gameName"));
    queryConstraints.push(limit(pageSize));

    console.log('Query constraints:', queryConstraints.map(c => {
      if (c.type === 'where') {
        return {
          type: 'where',
          field: c._fieldPath?.toString(),
          operator: c._opStr,
          value: c._value
        };
      }
      return {
        type: c.type,
        field: c._field?.toString(),
        direction: c._direction
      };
    }));

    // Only execute query if we have a search term or other filters
    if (queryConstraints.length > 2 || !searchQuery.trim()) {  // >2 because we always have orderBy and limit
      // Execute final query
      const finalQuery = query(gamesCollectionRef, ...queryConstraints);
      const querySnapshot = await getDocs(finalQuery);
      
      console.log('Query results count:', querySnapshot.size);
      
      // Log first few documents for debugging
      querySnapshot.docs.slice(0, 3).forEach((doc, index) => {
        const data = doc.data();
        console.log(`Document ${index + 1}:`, {
          id: doc.id,
          gameName: data.data?.gameName,
          keywords: data.gameNameKeywords,
          searchableGameName: data.searchableGameName
        });
      });

      // Create a Map to deduplicate games based on gameName
      const uniqueGames = new Map();
      querySnapshot.docs.forEach(doc => {
        const data = doc.data();
        const gameName = data.data?.gameName;
        if (!uniqueGames.has(gameName)) {
          uniqueGames.set(gameName, {
            id: doc.id,
            ...data
          });
        }
      });

      const games = Array.from(uniqueGames.values());

      return NextResponse.json({
        games,
        totalPages: Math.ceil(games.length / pageSize),
        currentPage: page,
        hasMore: games.length === pageSize,
      });
    } else {
      // Return empty results if no search term or filters
      return NextResponse.json({
        games: [],
        totalPages: 0,
        currentPage: 1,
        hasMore: false,
      });
    }
  } catch (error) {
    console.error("Error fetching games:", error);
    console.error("Error details:", {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}