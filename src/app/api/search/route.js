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
  let searchQuery = url.searchParams.get("query") || "";
  let lastDocId_ = url.searchParams.get("lastDocId") || null;
  const pageSize = parseInt(url.searchParams.get("limit")) || 12;
  const operatingSystem = url.searchParams.get("operatingSystem") || "";
  const rating = url.searchParams.get("rating") || "";
  const genre = (url.searchParams.get("genre") || "").toLowerCase();
  const tags = (url.searchParams.get("tags") || "").toLowerCase();
  
  const sortOrder = url.searchParams.get("sortOrder") || "";

  if (searchQuery === "all") {
    searchQuery = "";
  }

  const gamesCollectionRef = collection(db, "games");

  try {
    async function search(lastDocId= lastDocId_) {
      let games_one = [];
      let games_two = [];
      let games_three = [];
      let games_four = [];
      let queryConstraints = [];

      if (searchQuery.trim()) {
        const lowercaseQuery = searchQuery.toLowerCase().trim();
        queryConstraints.push(where("gameNameKeywords", "array-contains", lowercaseQuery));
      }

      if (rating) {
        const ratingString = rating.toString();
        queryConstraints.push(where("data.rating", ">=", ratingString));
      }

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

      if (lastDocId) {
        const lastDocRef = doc(db, "games", lastDocId);
        const lastDocSnapshot = await getDoc(lastDocRef);
        if (lastDocSnapshot.exists()) {
          queryConstraints.push(startAfter(lastDocSnapshot));
        }
      }

      queryConstraints.push(limit(pageSize));

      // Execute base query
      let finalQuery = query(gamesCollectionRef, ...queryConstraints);
      let querySnapshot = await getDocs(finalQuery);
      
      games_one = querySnapshot.docs.map(doc => ({
        id: doc.id,
        firebaseId: doc.id,
        ...doc.data()
      }));
      const lastVisibleId = games_one.length > 0 ? games_one[games_one.length - 1].firebaseId : null;

      // Operating System query
      if (operatingSystem) {
        console.log("Operating system query");
       
        queryConstraints = [where("data.operatingSystem", "array-contains", operatingSystem)];
   
        
      if (lastDocId) {
        const lastDocRef = doc(db, "games", lastDocId);
        const lastDocSnapshot = await getDoc(lastDocRef);
        if (lastDocSnapshot.exists()) {
          queryConstraints.push(startAfter(lastDocSnapshot));
        }
      }
      queryConstraints.push(limit(pageSize));


        finalQuery = query(gamesCollectionRef, ...queryConstraints);
        querySnapshot = await getDocs(finalQuery);
        games_two = querySnapshot.docs.map(doc => ({
          id: doc.id,
          firebaseId: doc.id,
          ...doc.data()
        }));
      }

      console.log("games_two length:", games_two.length);

      // Genre query
      if (genre) {
        queryConstraints = [
          where("data.genre", "array-contains", genre)];
        

          if (lastDocId) {
            const lastDocRef = doc(db, "games", lastDocId);
            const lastDocSnapshot = await getDoc(lastDocRef);
            if (lastDocSnapshot.exists()) {
              queryConstraints.push(startAfter(lastDocSnapshot));
            }
          }
          queryConstraints.push(limit(pageSize));
        finalQuery = query(gamesCollectionRef, ...queryConstraints);
        querySnapshot = await getDocs(finalQuery);
        games_three = querySnapshot.docs.map(doc => ({
          id: doc.id,
          firebaseId: doc.id,
          ...doc.data()
        }));
      }

      // Tags query
      if (tags) {
        queryConstraints = [
          where("data.tags", "array-contains", tags)];
          if (lastDocId) {
            const lastDocRef = doc(db, "games", lastDocId);
            const lastDocSnapshot = await getDoc(lastDocRef);
            if (lastDocSnapshot.exists()) {
              queryConstraints.push(startAfter(lastDocSnapshot));
            }
          }
          queryConstraints.push(limit(pageSize));

        finalQuery = query(gamesCollectionRef, ...queryConstraints);
        querySnapshot = await getDocs(finalQuery);
        games_four = querySnapshot.docs.map(doc => ({
          id: doc.id,
          firebaseId: doc.id,
          ...doc.data()
        }));
      }


      
      // Combine and deduplicate results
      let combinedResults = [...games_one, ...games_two, ...games_three, ...games_four];

       
      let games = Array.from(new Set(combinedResults.map(doc => doc.id)))
        .map(id => combinedResults.find(doc => doc.id === id));
        if (tags || genre || operatingSystem) {
          combinedResults = [ ...games_two, ...games_three, ...games_four];
          games = Array.from(new Set(combinedResults.map(doc => doc.id)))
        .map(id => combinedResults.find(doc => doc.id === id));}
       
     
      return {
        games,
        lastVisibleId
      };
    }

    // Execute search
    const searchResult = await search();
    
    // Execute second search if needed
    console.log(`Search result length: ${searchResult.games.length}`);
    while (searchResult.games.length < 12 && searchResult.games.length !== 0 ) {
      const secondSearchResult = await search(searchResult.lastVisibleId);
      searchResult.games = [...searchResult.games, ...secondSearchResult.games];
      searchResult.lastVisibleId = secondSearchResult.lastVisibleId;
    }
console.log(pageSize)
    return NextResponse.json({
      games: searchResult.games,
      hasMore: searchResult.games.length === pageSize,
      lastDocId: searchResult.lastVisibleId
    });

  } catch (error) {
    console.error("Error in search:", error);
    console.error("Stack trace:", error.stack);
    return NextResponse.json(
      { error: "Internal server error", details: error.stack },
      { status: 500 }
    );
  }
}