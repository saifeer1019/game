"use client";
import Image from 'next/image';
import { useState, useEffect } from 'react';
import axios from 'axios';
import PortraitImageCrop from './widgets/Portrait';
import { dummyGames } from './DummyGames';
import { Link, Eye, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export default function GalleryPills({jfgn}) {
  const [games, setGames] = useState(dummyGames);

  useEffect(() => {
    // axios.get('http://localhost:3000/api/games')
    //     .then(response => setGames(response.data))
    //     .catch(error => console.error(error));
    console.log('gfgfd');
  }, []);

  return (
    <div className="w-full mb-4 sm:mb-2">
      <div className="flex flex-col gap-4 md:gap-4 md:gap-y-6">
        {games.slice(0, 4).map((game) => (
        
          <div key={game.imageUrl} className='flex justify-start gap-x-4 hover:bg-cyan-500/10 cursor-pointer border-b-1 py-2 mr-4  border-b-gray-300'>
              <PortraitImageCrop
                src={game.imageUrl}
                alt={game.data.gameName}    
                width = {50}
                height = {70}   
           
   
              />
              <div className='flex flex-col gap-2 self-center'>
                <h1 className='inter text-light_ font-semibold'>{game.data.gameName}</h1>
                <div className='flex gap-y-2 '>
               <p className='self-start mr-2 bg-[#fedc94] rounded-[5px] text-primary_ font-bold w-fit px-2 text-xs'>8.0</p>
               <p className='self-start mr-1 bg-[#e3b5cd] rounded-[5px] text-primary_ font-bold w-fit px-2 text-xs'>Adult</p>
               <p className='self-start  text-light_ font-bold w-fit text-xs'>169 views</p>
             
               </div>
              </div>
              
              
          </div>

        ))}
      </div>
    </div>
  );
}
