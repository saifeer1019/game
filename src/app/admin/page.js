"use client"
import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "@/components/admin/Side";
import GameList from "@/components/admin/GameList";
import Navbar from "@/components/Navbar";
import Filter from "@/components/widgets/Filter";
import { Loader2, RefreshCw } from 'lucide-react';

export default function AdminPage() {
  const [games, setGames] = useState([]);
  const [lastDocId, setLastDocId] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState('');
  const [filters, setFilters] = useState({
    operatingSystems: '',
    releaseYear: '',
    ratings: '',
    developer: '',
    genre: '',
    tags: '',
  });

  const fetchGames = async (lastDocId = null) => {
    if (loading) return;
    setLoading(true);
    
    try {
      const response = await axios.get(`/api/search`, {
        params: {
          query,
          
          operatingSystem: filters.operatingSystems,
          releaseYear: filters.releaseYear,
          rating: filters.ratings,
          developer: filters.developer || developer, // Prioritize filter selection
          genre: filters.genre || genre, // Prioritize filter selection
          tags: filters.tags || tag, // Prioritize filter selection
          language:
          sortOrder,
          limit: 100,
          lastDocId,
        }
      });

      const newGames = response.data.games;
      const newLastDocId = response.data.lastDocId;

      if (!lastDocId) {
        setGames(newGames);
      } else {
        setGames(prevGames => [...prevGames, ...newGames]);
      }
      
      setLastDocId(newLastDocId);
      setHasMore(!!newLastDocId);
    } catch (error) {
      console.error("Error:", error);
      setError(error);  
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLastDocId(null);
    fetchGames(null);
  }, [filters, sortOrder]);

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      fetchGames(lastDocId);
    }
  };

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden bg-[#111111]">
      <Navbar />
      <div className="flex flex-row flex-1 h-screen overflow-hidden">
        <Sidebar currentTab="admin" />
        <div className="flex-1 p-4 overflow-hidden">
          <div className="h-full flex flex-col overflow-y-auto">
            <div className="mt-10 ">
              <Filter 
                filters={filters} 
                setFilters={setFilters} 
              />
            </div>
            <div className="max-h-[100vh] overflow-y-scroll">
            <GameList games={games} setGames={setGames} lastDocId={lastDocId} />
            </div>
            <div className="p-4 flex justify-center items-center space-x-4">
              {loading && (
                <div className="flex items-center space-x-2 text-[#e4e4e7]">
                  <Loader2 className="animate-spin" />
                  <span>Loading games...</span>
                </div>
              )}
              {!loading && hasMore && (
                <button
                  onClick={handleLoadMore}
                  className="flex items-center space-x-2 px-4 py-2 bg-[#d92365] hover:bg-[#b01d52] text-white rounded-md transition-colors"
                >
                  <RefreshCw size={16} />
                  <span>Load More</span>
                </button>
              )}
              {error && <div className="text-red-400">{error.message}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}