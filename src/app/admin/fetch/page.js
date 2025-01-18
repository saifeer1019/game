"use client"
import GameManager from "@/components/GameManager";
import Sidebar from "@/components/admin/Side";
import { Button } from "@headlessui/react";
import { useState } from "react";
import axios from "axios";


export default function Fetch() {
  const [currentTab, setCurrentTab] = useState("fetch");
  const [fetching, setFetching] = useState(false);  
  const [fetched, setFetched] = useState(false); 
  const [gameIds, setGameIds] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const ids = JSON.parse(e.target.result);
      setGameIds(ids);
      console.log(ids);
    };
    reader.readAsText(file);
  };

  const handleFetch = async () => {
    try {
      setFetching(true);
      const response = await axios.post('/api/admin/fetch', { ids:gameIds });
      console.log(response);
      setFetching(false);
      setFetched(true);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex flex-row h-screen">
      <Sidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <div className="p-4 flex flex-col w-full h-screen justify-center items-center">
    { !fetching && <div className="p-4  self-center justify-self-center">
        <input type="file" accept=".json" onChange={handleFileUpload} />
        <Button className="bg-gray-300 px-2 py-1 rounded" onClick={handleFetch} disabled={gameIds.length === 0}>
          Fetch Games
        </Button>
        </div>}

        {fetching && <p className="text-lg text-gray-400 self-center justify-self-center">Fetching games. Please wait...</p>}
        {fetched && <div className="">
          Successfully fetched games
          
          </div>
        }
      
        </div>
    </div>
  );
}