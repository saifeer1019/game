"use client"
import React from 'react';
import { useState } from 'react';
import axios from 'axios';

export default function GameList({ games, setGames, lastDocId }) {
    const [changed, setChanged] = useState(false);
    const handleInputChange = async (id, field, value) => {
        setChanged(true);
        setGames(games.map((game) =>
            game.id === id ? { ...game, [field]: value } : game
        ));
    };
   
    const handleSave = async () => {
        try {
            // Use Promise.all to handle multiple requests concurrently
            await Promise.all(
                games.map(async (game) => {
                    try {
                        await axios.put(`/api/admin/game`, game);
                    } catch (error) {
                        // Throw the error to be caught by the outer try-catch
                        throw new Error(`Failed to update game ${game.id}: ${error.message}`);
                    }
                })
            );
            
            alert('Changes saved successfully');
            setChanged(false); // Reset the changed state after successful save
        } catch (error) {
            console.error('Error saving changes:', error);
            alert('Failed to save changes: ' + error.message);
        }
    };

    return (
        <div className="flex flex-col gap-4 p-4">
                <button
                    className={`disabled:bg-slate-400 px-4 py-1 w-fit bg-blue-500 self-end text-white rounded-lg hover:bg-blue-600 transition-colors`}
                    onClick={handleSave}
                    disabled={!changed}
                >
                    Apply Changes
            </button>
            {games &&
                games.map((game, index) => (
                    <div key={index} className="flex bg-primary_ rounded-lg shadow-md p-4 min-h-[200px]">
                        <div className="w-[30%] max-w-[300px]">
                            <img
                                src={game.data?.bannerURL}
                                alt={game.data?.gameName}
                                className="h-full w-full object-cover rounded-lg"
                            />
                        </div>
                        <div className="flex justify-between items-start flex-1 gap-4 p-4">
                            <div className="flex flex-col gap-2">
                                <h2 className="text-xl font-bold text-zinc-400">{game.data?.gameName}</h2>
                                <p className="text-gray-600">ID: {game.id}</p>
                                <p className="text-gray-600">Category: {game.data?.category}</p>
                                <div className="flex flex-wrap gap-2 items-center">
                                    <p className="text-gray-600">Views- </p>
                                    <input
                                        className="text-gray-600 bg-secondary_ rounded px-2 py-1 w-auto"
                                        value={game.views}
                                        onChange={(e) => handleInputChange(game.id, 'views', e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {['featured', 'mostRated', 'popular', 'trending'].map((field) => (
                                        <button
                                            key={field}
                                            className={`px-2 py-1 rounded-lg transition-colors ${
                                                game[field] ? 'bg-green-500 text-white' : 'bg-gray-300'
                                            }`}
                                            onClick={() => handleInputChange(game.id, field, !game[field])}
                                        >
                                            {field.charAt(0).toUpperCase() + field.slice(1)}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <button
                                    className="px-4 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                                    onClick={() => handleSave(game.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    );
}