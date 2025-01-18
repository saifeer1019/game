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
  // Get the actual search path and parameters
  const url = new URL(request.url);
  console.log('Full URL:', url.toString());
  
  const searchQuery = url.searchParams.get("query") || "";
  const lastDocId = url.searchParams.get("lastDocId") || null;
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const operatingSystem = url.searchParams.get("operatingSystem") || "";
  const releaseYear = url.searchParams.get("releaseYear") || "";
  const rating = url.searchParams.get("rating") || "";
  const developer = url.searchParams.get("developer") || "";
  const genre = url.searchParams.get("genre") || "";
  const tags = url.searchParams.get("tags") || ""; 
  const sortOrder = url.searchParams.get("orderBy") || "";

  console.log('Parsed search parameters:', {
    searchQuery,
    lastDocId,
    page,
    operatingSystem,
    releaseYear,
    rating,
    developer,
    genre,
    tags,
    sortOrder
  });

  const pageSize = 12;
  const gamesCollectionRef = collection(db, "games");

  try {
    let queryConstraints = [];

    // Add search filter if there's a search query
    if (searchQuery.trim()) {
      const lowercaseQuery = searchQuery.toLowerCase().trim();
      console.log('Adding search filter for:', lowercaseQuery);
      // Log the full constraint for debugging
      const searchConstraint = where("gameNameKeywords", "array-contains", lowercaseQuery);
      console.log('Search constraint:', {
        type: searchConstraint.type,
        fieldPath: searchConstraint._fieldPath?.toString(),
        opStr: searchConstraint._opStr,
        value: searchConstraint._value
      });
      queryConstraints.push(searchConstraint);
    }

    // Add order by
    const orderByConstraint = orderBy("data.gameName", sortOrder === 'desc' ? 'desc' : 'asc');
    queryConstraints.push(orderByConstraint);
    
    // Add pagination
    queryConstraints.push(limit(pageSize));

    // Add startAfter if lastDocId is provided
    if (lastDocId) {
      console.log('Fetching last document:', lastDocId);
      const lastDocRef = doc(db, "games", lastDocId);
      const lastDocSnapshot = await getDoc(lastDocRef);
      if (lastDocSnapshot.exists()) {
        queryConstraints.push(startAfter(lastDocSnapshot));
      }
    }

    // Log the final query setup
    console.log('Query constraints before execution:', queryConstraints.map(c => ({
      type: c.type,
      fieldPath: c._fieldPath?.toString() || c._field?.toString(),
      opStr: c._opStr,
      value: c._value,
      direction: c._direction
    })));

    // Execute query
    const finalQuery = query(gamesCollectionRef, ...queryConstraints);
    const querySnapshot = await getDocs(finalQuery);
    
    // Log results
    console.log('Query returned', querySnapshot.size, 'documents');
    
    // if (querySnapshot.size > 0) {
    //   console.log('First document data:', {
    //     id: querySnapshot.docs[0].id,
    //     data: querySnapshot.docs[0].data()
    //   });
    // }

    const games = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json({
      games,
      currentPage: page,
      hasMore: games.length === pageSize,
      lastDocId: games.length > 0 ? games[games.length - 1].id : null
    });

  } catch (error) {
    console.error("Error in search:", error);
    console.error("Stack trace:", error.stack);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}