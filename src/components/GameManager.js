"use client"
import { useState, useEffect } from "react";

export default function GameManager() {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [games, setGames] = useState([]);

  // Fetch games from the API
  const fetchGames = async () => {
    try {
      const response = await fetch("/api/games");
      const data = await response.json();
      setGames(data);
    } catch (error) {
      console.error("Failed to fetch games:", error);
    }
  };

  // Add a new game
  const addGame = async (e) => {
    e.preventDefault();

    if (!name || !imageUrl) {
      alert("Name and Image URL are required!");
      return;
    }

    try {
      const response = await fetch("/api/games", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, imageUrl }),
      });

      if (response.ok) {
        setName("");
        setImageUrl("");
        fetchGames(); // Refresh the game list
      } else {
        const errorData = await response.json();
        console.error("Failed to add game:", errorData);
      }
    } catch (error) {
      console.error("Error adding game:", error);
    }
  };

  // Fetch games on component mount
  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <div>
      <h1>Game Manager</h1>

      {/* Add Game Form */}
      <form onSubmit={addGame}>
        <div>
          <label>Game Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter game name"
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Enter image URL"
          />
        </div>
        <button type="submit">Add Game</button>
      </form>

      {/* Display Games */}
      <h2>Game List</h2>
      <ul>
        {games.map((game) => (
          <li key={game.id}>
            <strong>{game.name}</strong>
            <br />
            <img src={game.imageUrl} alt={game.name} style={{ width: "100px" }} />
          </li>
        ))}
      </ul>
    </div>
  );
}
