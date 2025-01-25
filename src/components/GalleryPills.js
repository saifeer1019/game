"use client";
import Image from 'next/image';
import { useState, useEffect } from 'react';
import axios from 'axios';
import PortraitImageCrop from './widgets/Portrait';
import { dummyGames } from './DummyGames';
import { Link, Eye, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export default function GalleryPills({games}) {
  

  return (
    <div className="w-full mb-4 sm:mb-2">
      <div className="flex flex-col gap-4 md:gap-4 md:gap-y-6">
        {games && games.slice(0, 5).map((game, idx) => (
        
          <div
          onClick={() => window.location.href = `/game/${game.slug}`}
           key={idx} className='flex justify-start gap-x-4 hover:bg-cyan-500/10 cursor-pointer border-b-1 py-2 mr-4  border-b-gray-300'>
          <div 
          className="relative overflow-hidden w-14 h-20 " >
              <Image
                src={game.data.bannerURL}
                alt={game.data.gameName}    
                className="object-cover "
                fill  
           
   
              />

              </div>
              <div className='flex flex-col gap-2 self-center'>
                <h1 className='inter text-light_  font-bold'>{game.data.gameName}</h1>
                <div className='flex gap-y-2 text-xs '>
               <p className='self-start mr-2 bg-[#fedc94] rounded-[5px] text-primary_ font-bold w-fit px-2 '>{Number(game.data.rating).toFixed(1)}</p>
               <p className='self-start mr-1 bg-[#e3b5cd] rounded-[5px] text-primary_ font-bold w-fit px-2 '>{game.data.tags[2]}</p>
               <p className='self-start  text-light_ font-bold w-fit '>{game.views} views</p>
             
               </div>
              </div>
              
              
          </div>

        ))}
      </div>
    </div>
  );
}
