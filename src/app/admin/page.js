// AdminPage.js
"use client"
import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "@/components/admin/Side";
import GameList from "@/components/admin/GameList";
import Navbar from "@/components/Navbar";
import Filter from "@/components/widgets/Filter";
export default function AdminPage() {
  const [games, setGames] = useState([]);
  const [lastDocId, setLastDocId] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState('');
    // Filters state
    const [filters, setFilters] = useState({
      operatingSystems: '',
      releaseYear: '',
      ratings: '',
      developer: '',
      genre: '',
      tags:'',
  });

  const fetchGames = async (lastDocId = null) => {
    if (loading) return;
    setLoading(true);
    
    try {
      const response = await axios.get(`/api/search`, {
        params: {
        query:'all',
 
          operatingSystem: filters.operatingSystems,
          releaseYear: filters.releaseYear,
          rating: filters.ratings,
          developer: filters.developer,
          genre: filters.genre,
          tags: filters.tags,
          sortOrder,
          limit: 5,
          lastDocId: lastDocId,
      }
  });

      const newGames = response.data.games;
      const newLastDocId = response.data.lastDocId;

      setGames((prevGames) => [...prevGames, ...newGames]);
      setLastDocId(newLastDocId);
      setHasMore(!!newLastDocId);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setError(error);  
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);
  useEffect(() => {
    setGames([]);  // Reset games when query changes
    fetchGames();
}, [, filters, sortOrder]);


  useEffect(() => {
    console.log(games)
  }, [games]);

  const handleLoadMore = () => {
    if (hasMore) {
      fetchGames(lastDocId);
    }
  };

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden bg-primary_">
    <Navbar />
      
      <div className="flex flex-row flex-1 h-screen overflow-hidden bg-primary_ ">
       
      <Sidebar currentTab="admin" />
        <div className="flex-1 p-4 overflow-hidden">
          <div className="h-full flex flex-col overflow-y-auto">

          
        <div className="mt-10 ">
        <Filter 
            filters={filters} 
            setFilters={setFilters} 
          
        />
    </div>
            <GameList games={games} setGames={setGames} />
            
            <div className="p-4 flex justify-center">
              {loading && <div className="text-light_">Loading...</div>}
              
              {!loading && (
                <button
                  onClick={handleLoadMore}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Load More
                </button>
              )}
              
              {error && <div className="text-red-500">{error.message}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
