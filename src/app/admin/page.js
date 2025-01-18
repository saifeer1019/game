"use client"
import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "@/components/admin/Side";
import GameList from "@/components/admin/GameList";

export default function AdminPage() {
  const [games, setGames] = useState([]);
  const [lastDocId, setLastDocId] = useState(null);  // To store the last document for pagination
  const [hasMore, setHasMore] = useState(true);  // To check if there are more games to fetch
  const [loading, setLoading] = useState(false);  // To manage loading state
  const [error, setError] = useState(null);

  const fetchGames = async (lastDocId = null) => {
    if (loading) return;  // Prevent multiple requests at the same time
    setLoading(true);
    
    try {
      const response = await axios.get(`/api/admin/games`, {
        params: {
          limit: 5,
          lastDocId: lastDocId,  // Pass last document ID for pagination
        },
      });

      // Handle the response data
      const newGames = response.data.documents;
      const newLastDocId = response.data.nextDocId;

      // Update state with new games and lastDocId
      setGames((prevGames) => [...prevGames, ...newGames]);
      setLastDocId(newLastDocId);

      // If no nextDocId, set hasMore to false
      setHasMore(!!newLastDocId);

      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();  // Initial fetch for the first page
  }, []);

  const handleLoadMore = () => {
    if (hasMore) {
      fetchGames(lastDocId);  // Fetch next set of games
    }
  };

  return (
    <div className="flex flex-row h-screen">
      <Sidebar currentTab="admin" />
      <div className="flex flex-col w-full">
        <GameList games={games} />

        {loading && <div>Loading...</div>}

        {hasMore && !loading && (
          <button
            onClick={handleLoadMore}
            className="self-center my-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Load More
          </button>
        )}

        {error && <div className="text-red-500">{error.message}</div>}
      </div>
    </div>
  );
}
