"use client"
import GameManager from "@/components/GameManager";
import Sidebar from "@/components/admin/Side";
import { Button } from "@headlessui/react";
import { useState } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";


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
   <div className="flex flex-col h-screen w-full overflow-hidden bg-primary_">
       <Navbar />
         
         <div className="flex flex-row flex-1 h-screen overflow-hidden bg-primary_ ">
          
         <Sidebar currentTab="admin" />
      <div className="p-4 flex flex-col w-full h-screen justify-start items-start mt-20">


    { !fetching && !fetched && <div className="p-4  ">

      <h1 className="text-2xl text-gray-400 mb-4">Fetch Games</h1>
        <input type="file" accept=".json" onChange={handleFileUpload} />
        <Button className="bg-gray-300 px-2 py-1 rounded" onClick={handleFetch} disabled={gameIds.length === 0}>
          Fetch Games
        </Button>
        </div>}

        {fetching && <p className="text-lg text-gray-400 ">Fetching games. It might take a while.... Please do not close tab...</p>}
        {fetched && <div className="text-lg text-gray-400 ">
          Successfully fetched games
          
          </div>
        }

        <div className="p-4  ">

        <h1 className="text-2xl text-gray-400 mb-4">Sync Game Charts</h1>
      
          <Button className="bg-gray-300 px-2 py-1 rounded" onClick={handleFetch} disabled={gameIds.length === 0}>
          Sync
          </Button>
         
  
         
            </div>

           
             
      
             
                </div>
          
    




      
     
        </div>
    </div>
  );
}