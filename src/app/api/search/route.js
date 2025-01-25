import { NextResponse } from "next/server";
import { db } from "@/config/firebase";
import { 
  collection, 
  getDocs,
  getDoc,
  doc, 
  query, 
  where, 
  limit, 
  startAfter,
  orderBy
} from "firebase/firestore";

export async function GET(request) {
  const url = new URL(request.url);
  
  // Logging input parameters
  console.log("Received Request Parameters:", {
    searchQuery: url.searchParams.get("query"),
    lastDocId: url.searchParams.get("lastDocId"),
    pageSize: url.searchParams.get("limit"),
    operatingSystem: url.searchParams.get("operatingSystem"),
    rating: url.searchParams.get("rating"),
    genre: url.searchParams.get("genre"),
    tags: url.searchParams.get("tags"),
    developer: url.searchParams.get("developer"),
    sortOrder: url.searchParams.get("sortOrder")
  });

  let searchQuery = url.searchParams.get("query") || "";
  let lastDocId = url.searchParams.get("lastDocId") || null;
  const pageSize = parseInt(url.searchParams.get("limit")) || 12;
  const operatingSystem = url.searchParams.get("operatingSystem") || "";
  const rating = url.searchParams.get("rating") || "";
  const genre = (url.searchParams.get("genre") || "").toLowerCase();
  const tags = (url.searchParams.get("tags") || "").toLowerCase();
  const developer = (url.searchParams.get("developer") || "").toLowerCase();
  const sortOrder = url.searchParams.get("sortOrder") || "";
  const category = url.searchParams.get("category") || "";
  const subcategory = url.searchParams.get("subcategory") || "";
  const prefix = url.searchParams.get("prefix") || "";
  const language = url.searchParams.get("language") || "";

  if (searchQuery === "all") {
    searchQuery = "";
  }

  const gamesCollectionRef = collection(db, "games");

  try {
    // Prepare search keys
    let searchKeys = [];
    let queryConstraints = [];

    // Add non-empty search parameters to searchKeys
    [searchQuery, tags, developer, genre, operatingSystem, category, subcategory, prefix, language  ]
      .filter(param => param !== "")
      .forEach(param => searchKeys.push(param.toLowerCase()));

    console.log("Prepared Search Keys:", searchKeys);

    // If searchKeys is not empty, add array-contains-any constraint
    if (searchKeys.length > 0) {
      queryConstraints.push(where("searchQueries", "array-contains-any", searchKeys));
    }

    // Add rating constraint if provided
    if (rating) {
      const ratingString = rating.toString();
      queryConstraints.push(where("data.rating", ">=", ratingString));
    }

    // Add sorting constraint based on sortOrder
    switch (sortOrder) {
      case "views":
        queryConstraints.push(orderBy("views", "desc"));
        break;
      case "recentlyAdded":
        queryConstraints.push(orderBy("data.releaseDate", "desc"));
        break;
      case "rating":
        queryConstraints.push(orderBy("data.rating", "desc"));
        break;
      case "alphabetical":
      default:
        queryConstraints.push(orderBy("data.gameName", "asc"));
        break;
    }

    // Add pagination constraints
    if (lastDocId) {
      const lastDocRef = doc(db, "games", lastDocId);
      const lastDocSnapshot = await getDoc(lastDocRef);
      if (lastDocSnapshot.exists()) {
        queryConstraints.push(startAfter(lastDocSnapshot));
      }
    }

    queryConstraints.push(limit(pageSize));

    console.log("Final Query Constraints:", queryConstraints.map(c => c.type));

    // Execute query
    let finalQuery = query(gamesCollectionRef, ...queryConstraints);
    let querySnapshot = await getDocs(finalQuery);
    let games = querySnapshot.docs.map(doc => ({
      id: doc.id,
      firebaseId: doc.id,
      ...doc.data()
    }));

    console.log("Query Results:", {
      gameCount: games.length,
      lastDocId: games.length > 0 ? games[games.length - 1].firebaseId : null
    });

    const lastVisibleId = games.length > 0 ? games[games.length - 1].firebaseId : null;

    return NextResponse.json({
      games: games,
      lastDocId: lastVisibleId
    });

  } catch (error) {
    console.error("Error in search:", error);
    console.error("Detailed Error Stack:", error.stack);
    return NextResponse.json(
      { 
        error: "Internal server error", 
        details: error.message,
        stack: error.stack 
      },
      { status: 500 }
    );
  }
}