import axios from 'axios';
import { db } from "@/config/firebase";
import { collection, addDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

function generateKeywords(gameName) {
  if (!gameName) return [];
  
  const words = gameName.toLowerCase().split(' ');
  const keywords = [];
  
  // Add individual words
  words.forEach(word => {
    if (word.length > 2) { // Skip very short words
      keywords.push(word);
    }
  });
  
  // Add combinations of consecutive words
  for (let i = 0; i < words.length - 1; i++) {
    keywords.push(words[i] + ' ' + words[i + 1]);
  }
  
  // Add the full name
  keywords.push(gameName.toLowerCase());
  
  return [...new Set(keywords)]; // Remove duplicates
}

export async function POST(request) {
    const gamesCollection = collection(db, "games");
    try {
        const { ids } = await request.json(); // Parse the request body to get ids array
        console.log(ids);
        
        for (const id of ids) {
            const response = await axios.get(`https://f95db-backend-1022000040343.asia-east1.run.app/api/fetchFull?id=${id}`, {
                headers: {
                    Authorization: `Bearer ${process.env.F95DB_API_KEY}`
                }
            });
            
            if (response.data.status === "Game does not exist") {
                console.log(`Game with id ${id} does not exist`);
                continue;
            }

            // Generate search-related fields
            const gameName = response.data.data?.gameName || '';
            const searchFields = {
                searchableGameName: gameName.toLowerCase(), // For direct comparisons
                gameNameKeywords: generateKeywords(gameName), // For partial word matching
            };

            // Add the document with all fields
            await addDoc(gamesCollection, { 
                ...response.data, 
                ...searchFields,
                featured: false, 
                trending: false, 
                popular: false, 
                views: 0 
            });
        }
        
        return NextResponse.json({ message: "Games added successfully" });

    } catch (error) {
        console.error("Error adding games:", error);
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}