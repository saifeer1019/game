"use client"

import { useState } from "react";
import axios from "axios";
import Sidebar from "@/components/admin/Side";
import { Button } from "@headlessui/react";
import { Loader2, CheckCircle, Upload, RefreshCw } from "lucide-react";

export default function Settings() {
  const [currentTab, setCurrentTab] = useState("fetch");
  const [fetching, setFetching] = useState(false);  
  const [fetched, setFetched] = useState(false); 
  const [syncing, setSyncing] = useState(false);  
  const [synced, setSynced] = useState(false); 
  const [gameIds, setGameIds] = useState([]);
  const [gamesFetched, setGamesFetched] = useState(0);
  const [error, setError] = useState(null);

  const handleFileUpload = (event) => {
    try {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const ids = JSON.parse(e.target.result);
        setGameIds(ids);
        setError(null);
      };
      reader.readAsText(file);
    } catch (err) {
      setError("Invalid file format");
    }
  };

  const handleFetch = async () => {
    if (gameIds.length === 0) {
      setError("Please upload a JSON file with game IDs");
      return;
    }

    try {
      setFetching(true);
      setError(null);
      const response = await axios.post('/api/admin/fetch', { ids: gameIds });
      setGamesFetched(response.data.games);
      setFetched(true);
    } catch (error) {
      setError('Failed to fetch games');
      console.error('Error:', error);
    } finally {
      setFetching(false);
    }
  };

  const handleSync = async () => {
    try {
      setSyncing(true);
      setError(null);
      const response = await axios.get('/api/game/fields');
      setSynced(true);
    } catch (error) {
      setError('Failed to sync game charts');
      console.error('Error:', error);
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden bg-[#111111]">
      <div className="flex flex-row flex-1 h-screen overflow-hidden">
        <Sidebar currentTab="admin" />
        
        <div className="p-6 flex flex-col w-full h-screen justify-start items-start space-y-8 overflow-y-auto">
          {error && (
            <div className="w-full bg-red-600/20 border border-red-600 text-red-400 p-4 rounded-lg">
              {error}
            </div>
          )}

          <div className="w-full max-w-md space-y-4">
            <h1 className="text-2xl text-[#e4e4e7] mb-4">Fetch Games</h1>
            
            {!fetching && !fetched && (
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <input 
                    type="file" 
                    accept=".json" 
                    onChange={handleFileUpload} 
                    className="text-[#7c7f87] file:mr-4 file:rounded-md file:border-0 file:bg-[#161618] file:text-[#e4e4e7] file:px-4 file:py-2"
                  />
                  <Button 
                    onClick={handleFetch} 
                    disabled={gameIds.length === 0}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md 
                      ${gameIds.length > 0 
                        ? 'bg-[#d92365] hover:bg-[#b01d52] text-white' 
                        : 'bg-[#161618] text-[#7c7f87] cursor-not-allowed'}`}
                  >
                    <Upload size={16} />
                    <span>Fetch Games</span>
                  </Button>
                </div>
                <p className="text-sm text-[#7c7f87]">
                  Use JSON format like [48357, 28347, 98237]
                </p>
              </div>
            )}

            {fetching && (
              <div className="flex items-center space-x-2 text-[#e4e4e7]">
                <Loader2 className="animate-spin" />
                <span>Fetching games. This may take a while...</span>
              </div>
            )}

            {fetched && (
              <div className="flex items-center space-x-2 text-green-400">
                <CheckCircle />
                <span>Successfully fetched {gamesFetched} games</span>
              </div>
            )}
          </div>

          <div className="w-full max-w-md space-y-4">
            <h1 className="text-2xl text-[#e4e4e7] mb-4">Sync Game Charts</h1>
            
            {!syncing && !synced && (
              <Button 
                onClick={handleSync}
                className="flex items-center space-x-2 px-4 py-2 bg-[#d92365] hover:bg-[#b01d52] text-white rounded-md"
              >
                <RefreshCw size={16} />
                <span>Sync Game Charts</span>
              </Button>
            )}

            {syncing && (
              <div className="flex items-center space-x-2 text-[#e4e4e7]">
                <Loader2 className="animate-spin" />
                <span>Syncing games. Please wait...</span>
              </div>
            )}

            {synced && (
              <div className="flex items-center space-x-2 text-green-400">
                <CheckCircle />
                <span>Successfully synced games</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}