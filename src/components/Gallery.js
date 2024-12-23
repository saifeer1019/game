"use client"
import Image from 'next/image';
import { useState, useEffect } from 'react';
import axios from 'axios';
import PortraitImageCrop from './widgets/Portrait';
import { dummyGames } from './DummyGames';
import { Link, Eye, Star } from 'lucide-react';

export default function Gallery() {
  const [games, setGames] = useState(dummyGames);

  useEffect(() => {
    // axios.get('http://localhost:3000/api/games')
    //     .then(response => setGames(response.data))
    //     .catch(error => console.error(error));
    console.log('gfgfd');
  }, []);

  return (
    <div className="w-full px-4 sm:px-6 md:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {games.map(game => (
          <div key={game.id} className="flex flex-col items-center w-full">
            <div className="relative w-full aspect-[440/151]">
              <PortraitImageCrop 
                src={game.imageUrl} 
                alt={game.gameName} 
                width='100%' 
                height={151} 
              />
              <div className="absolute top-0 left-2 flex flex-wrap mt-2 items-center gap-2 z-20">
                {game.data.prefix.map((prefix, index) => (
                  <p 
                    key={index} 
                    className="bg-lime-600 text-gray-100 roboto-condensed text-xs sm:text-sm font-semibold pb-[1px] px-2 rounded"
                  >
                    {prefix}
                  </p>
                ))}
                <p className="text-gray-900 roboto-condensed font-semibold bg-gray-100 px-2 pb-[1px] text-xs sm:text-sm rounded">
                  {game.data.version}
                </p>
              </div>
            </div>

            <div className="flex flex-col w-full bg-[#1c1c1f] p-3 sm:p-4">
              <h2 className="bebas text-gray-100 text-lg sm:text-xl font-semibold truncate">
                {game.data.gameName}
              </h2>

              <div className="flex flex-row justify-between gap-x-2 w-full mt-2">
                <div className="flex flex-row gap-x-2 text-xs sm:text-sm text-white/50">
                  <div className="flex flex-row items-center">
                    <Eye className="w-3 h-3 mr-[2px]" />
                    <p className="orbitron">{game.data.ratingCount} Views</p>
                  </div>

                  <div className="flex flex-row items-center">
                    <Link className="w-3 h-3 mr-[2px]" />
                    <p className="orbitron">{game.data.developerLinks.length} Links</p>
                  </div>

                  <div className="flex flex-row items-center">
                    <Star className="w-3 h-3 mr-[2px]" />
                    <p className="orbitron">{game.data.rating}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}