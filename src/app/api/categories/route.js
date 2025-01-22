import { NextResponse } from "next/server";
import { db } from "@/config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export async function GET() {
  try {
    const tags = collection(db, "tags");
    const genres = collection(db, "genres");
    const developers = collection(db, "developers");

    const tagsSnapshot = await getDocs(tags);
    const genresSnapshot = await getDocs(genres);
    const developersSnapshot = await getDocs(developers);

    const tagsList = [];

    tagsSnapshot.forEach((doc) => {
      tagsList.push({ id: doc.id, ...doc.data() });
    });
    const genresList = [];
    genresSnapshot.forEach((doc) => {
      genresList.push({ id: doc.id, ...doc.data() });
    });
    const developersList = [];
    developersSnapshot.forEach((doc) => {
      developersList.push({ id: doc.id, ...doc.data() });
    });

    return new NextResponse(
      JSON.stringify({ tags: tagsList, genres: genresList, developers: developersList }),
      { status: 200 }
    );  
    } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 }); 
    }
}
