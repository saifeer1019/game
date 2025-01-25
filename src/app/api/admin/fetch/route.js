import axios from 'axios';
import { db } from "@/config/firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { NextResponse } from "next/server";

// Function to generate keywords from the game name
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

// Function to check if an item exists in the collection
async function checkIfExists(collectionRef, field, value) {
  const q = query(collectionRef, where(field, "==", value));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty; // Returns true if exists, false if not
}

// Main POST function to handle adding games and associated data
export async function POST(request) {
  const gamesCollection = collection(db, "games");
  const tagsCollection = collection(db, "tags");
  const developersCollection = collection(db, "developers");
  const genresCollection = collection(db, "genres");
  const languageCollection = collection(db, 'languages')

  try {
    const { ids } = await request.json(); // Parse the request body to get ids array
    console.log(ids);
    let count = 0

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

      //slug
      const generateSlug = (z) => {
        return z
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')  // Replace non-alphanumeric with dash
          .replace(/^-|-$/g, '')  // Remove leading/trailing dashes
          .slice(0, 50);  // Limit length
      };
      
      // Usage in add game API
      const slug = generateSlug(gameName);
      const languages = response.data.data?.language.split(', ');



      const searchFields = {
        searchableGameName: gameName.toLowerCase(), // For direct comparisons
        gameNameKeywords: generateKeywords(gameName), // For partial word matching
      };
      const x = gameName.toLowerCase()
      const y =  generateKeywords(gameName)
    
      const tags = response.data.data?.tags || [];
      const developer = response.data.data?.developerName || '';
      const genres = response.data.data?.genre || [];
      const os = response.data.data?.operatingSystem || [];
     
      const prefix = response.data.data?.prefix || [];
      const category = response.data.data?.category || [];
      const subcategory = response.data.data?.subCategory || [];


      // Add unique tags to the tags collection
      for (const tag of tags) {
        const tagExists = await checkIfExists(tagsCollection, "name", tag);
        if (!tagExists) {
          await addDoc(tagsCollection, { name: tag });
          console.log(`Added new tag: ${tag}`);
        }
      }

      // Add unique genres to the genres collection
      for (const genre of genres) {
        const genreExists = await checkIfExists(genresCollection, "name", genre);
        if (!genreExists) {
          await addDoc(genresCollection, { name: genre });
          console.log(`Added new genre: ${genre}`);
        }
      }

         // Add unique tags to the tags collection
         for (const tag of languages) {
          const tagExists = await checkIfExists(languageCollection, "name", tag);
          if (!tagExists) {
            await addDoc(languageCollection, { name: tag });
            console.log(`Added new tag: ${tag}`);
          }
        }
  

      // Add unique developers to the developers collection
     
        const developerExists = await checkIfExists(developersCollection, "name", developer);
        if (!developerExists) {
          await addDoc(developersCollection, { name: developer });
          console.log(`Added new developer: ${developer}`);
        }


        const searchQueries = [x, category, subcategory, ...y,...developer, ...genres, ...tags, ...os, ...languages, ...prefix,   ]

        // Add the document with all fields
        await addDoc(gamesCollection, { 
          ...response.data, 
          ...searchFields,
          slug: slug,
          featured: false, 
          trending: false, 
          popular: false, 
          views: 0,
          languages: languages,
          searchQueries: searchQueries  
        });
  
        count ++
    }
      console.log("Games added successfully");
    return NextResponse.json({ message: `${count} Games added successfully `, games: count},);

  } catch (error) {
    console.error("Error adding games:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
