"use client"
import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Trash2, Save, Star, TrendingUp, Award, Zap } from 'lucide-react';
import Image from 'next/image';

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
            await Promise.all(
                games.map(async (game) => {
                    try {
                        await axios.put(`/api/admin/game`, game);
                    } catch (error) {
                        throw new Error(`Failed to update game ${game.id}: ${error.message}`);
                    }
                })
            );
            
            alert('Changes saved successfully');
            setChanged(false);
        } catch (error) {
            console.error('Error saving changes:', error);
            alert('Failed to save changes: ' + error.message);
        }
    };

    const handleZ = async (id) => {
        try {
            await axios.delete(`/api/admin/game`, { data: { id: id } });
            alert('Deleted successfully');
            setChanged(false);
        } catch (error) {
            console.error('Error saving changes:', error);
            alert('Failed to save changes: ' + error.message);
        }
    }

    return (
        <div className="flex flex-col gap-4 p-6 bg-[#111111] min-h-screen">
            <button
                className={`self-end px-4 py-2 rounded-md transition-colors 
                    ${changed 
                        ? 'bg-[#d92365] hover:bg-[#b01d52] text-white' 
                        : 'bg-[#161618] text-[#7c7f87] cursor-not-allowed'}`}
                onClick={handleSave}
                disabled={!changed}
            >
                <div className="flex items-center space-x-2">
                    <Save size={16} />
                    <span>Apply Changes</span>
                </div>
            </button>

            {games && games.map((game, index) => (
                <div 
                    key={index} 
                    className="flex bg-[#161618] rounded-lg shadow-md p-4 min-h-[240px] border border-[#7c7f87]/20"
                >
                <div className="w-[30%] max-w-[300px] relative">
                <Image
                  src={game.data?.bannerURL}
                  alt={game.data?.gameName}
                  className="object-cover rounded-lg"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
                    <div className="flex justify-between items-start flex-1 gap-4 p-4">
                        <div className="flex flex-col gap-3">
                            <h2 className="text-xl font-bold text-[#e4e4e7]">{game.data?.gameName}</h2>
                            <p className="text-[#7c7f87]">ID: {game.id}</p>
                            <p className="text-[#7c7f87]">Category: {game.data?.category}</p>
                            
                            <div className="flex items-center space-x-2">
                                <span className="text-[#7c7f87]">Views</span>
                                <input
                                    type="number"
                                    className="bg-[#111111] text-[#e4e4e7] rounded px-2 py-1 w-20 border border-[#7c7f87]/30"
                                    value={game.views}
                                    onChange={(e) => handleInputChange(game.id, 'views', e.target.value)}
                                />
                            </div>

                            <div className="flex flex-wrap gap-2 mt-2">
                                {[
                                    { field: 'featured', icon: Star },
                                    { field: 'mostRated', icon: Award },
                                    { field: 'popular', icon: Zap },
                                    { field: 'trending', icon: TrendingUp }
                                ].map(({ field, icon: Icon }) => (
                                    <button
                                        key={field}
                                        className={`flex items-center space-x-1 px-2 py-1 rounded-lg transition-colors ${
                                            game[field] 
                                                ? 'bg-[#d92365] text-white' 
                                                : 'bg-[#161618] text-[#7c7f87] border border-[#7c7f87]/30'
                                        }`}
                                        onClick={() => handleInputChange(game.id, field, !game[field])}
                                    >
                                        <Icon size={16} />
                                        <span>{field.charAt(0).toUpperCase() + field.slice(1)}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                        
                        <div>
                            <button
                                className="flex items-center space-x-2 px-4 py-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 transition-colors"
                                onClick={() => handleZ(game.id)}
                            >
                                <Trash2 size={16} />
                                <span>Delete</span>
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}