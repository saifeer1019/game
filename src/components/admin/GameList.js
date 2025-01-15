"use client"
import React, { useState } from 'react';
import axios from 'axios';

export default function GameList({ games }) {
    const [gameStates, setGameStates] = useState(games);

    const handleInputChange = (id, field, value) => {
        setGameStates((prevState) =>
            prevState.map((game) =>
                game.id === id ? { ...game, [field]: value } : game
            )
        );
    };

    const handleSave = async (id) => {
        const game = gameStates.find((game) => game.id === id);
        try {
            await axios.put(`/api/admin/game`, game);
            alert('Changes saved successfully');
        } catch (error) {
            console.error('Error saving changes:', error);
            alert('Failed to save changes');
        }
    };

    return (
        <div className="flex flex-col gap-4 p-4 w-full">
            {gameStates &&
                gameStates.map((game) => (
                    <div key={game.id} className="h-[30vh] w-full flex bg-white rounded-lg shadow-md p-4">
                        <div className="w-[30vw]">
                            <img
                                src={game.data?.bannerURL}
                                alt={game.data?.gameName}
                                className="h-full object-cover rounded-t-lg"
                            />
                        </div>
                        <div className="flex justify-between items-start w-full gap-4 p-4">
                            <div>
                                <h2 className="text-xl font-bold">{game.data?.gameName}</h2>
                                <p className="text-gray-600">ID: {game.id}</p>
                                <p className="text-gray-600">Category: {game.data?.category}</p>
                                <input
                                    className="text-gray-600"
                                    value={game.views}
                                    onChange={(e) => handleInputChange(game.id, 'views', e.target.value)}
                                />
                                <div className="flex gap-2 mt-2">
                                    {['featured', 'mostRated', 'popular', 'trending'].map((field) => (
                                        <button
                                            key={field}
                                            className={`px-2 py-1 rounded-lg ${
                                                game[field] ? 'bg-green-500' : 'bg-gray-300'
                                            }`}
                                            onClick={() => handleInputChange(game.id, field, !game[field])}
                                        >
                                            {field.charAt(0).toUpperCase() + field.slice(1)}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <button
                                className="self-start my-2 h-fit bg-blue-500 text-white px-4 py-1 rounded-lg"
                                onClick={() => handleSave(game.id)}
                            >
                                Apply
                            </button>
                        </div>
                    </div>
                ))}
        </div>
    );
}
    