import { NextResponse } from "next/server";
import { db } from "@/config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export async function GET() {
  try {
    const gamesCollectionRef = collection(db, "games");

    // Fetch games based on different categories
    const fetchGamesByCategory = async (category) => {
      const categoryQuery = query(gamesCollectionRef, where(category, "==", true));
      const querySnapshot = await getDocs(categoryQuery);
      return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    };

       // Fetch games based on different genre
       const fetchGamesByGenre = async (genre) => {
        const genreQuery = query(gamesCollectionRef, where("data.genre", "array-contains", genre));
        const querySnapshot = await getDocs(genreQuery);
        return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      };

    // Fetch all required categories in parallel
    const [sandbox, threDCG, voyeurism, twoDGame] = await Promise.all([
      fetchGamesByGenre("Sandbox"),
      fetchGamesByGenre("3DCG"),
      fetchGamesByGenre("3DCG"),
      fetchGamesByGenre("Sandbox"),
    ]);


      // Fetch all required genre in parallel
      const [featuredGames, trendingGames, popularGames, mostViewedGames] = await Promise.all([
        fetchGamesByCategory("featured"),
        fetchGamesByCategory("trending"),
        fetchGamesByCategory("popular"),
        fetchGamesByCategory("mostRated"),
      ]);

    

    // Construct the response object
    const response = {
      featured: featuredGames,
      trending: trendingGames,
      popular: popularGames,
      mostViewed: mostViewedGames,
      sandbox:sandbox,
      threDCG:threDCG,
      voyeurism: voyeurism,
      twoDGame: twoDGame
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching games by categories:", error);
    return NextResponse.json({ error: "Failed to fetch games" }, { status: 500 });
  }
}
