"use client"
import GameManager from "@/components/GameManager";
import Sidebar from "@/components/admin/Side";
import { Button } from "@headlessui/react";
import { useState } from "react";
import axios from "axios";


export default function Fetch() {
  const [currentTab, setCurrentTab] = useState("sections");
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
      const response = await axios.post('/api/admin/fetch', { ids:gameIds });
      console.log(response);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex flex-row h-screen">
      <Sidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <div className="p-4">
        <input type="file" accept=".json" onChange={handleFileUpload} />
        <Button className="bg-gray-300 px-2 py-1 rounded" onClick={handleFetch} disabled={gameIds.length === 0}>
          Fetch Games
        </Button>
      </div>
    </div>
  );
}