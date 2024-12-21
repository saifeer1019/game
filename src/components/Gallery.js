"use client"
import Image from 'next/image';
import { useState, useEffect } from 'react';
import axios from 'axios';
import PortraitImageCrop from './widgets/Portrait';
import { dummyGames } from './DummyGames';
import {Link, Eye, Star} from 'lucide-react';

export default function Gallery() {



    const [games, setGames] = useState(dummyGames);

    useEffect(() => {
        // axios.get('http://localhost:3000/api/games')
        //     .then(response => setGames(response.data))
        //     .catch(error => console.error(error));

            console.log(games[0]    );
    }, []);

     
  return (
    <div className="">
   
    <div className="grid grid-cols-4 gap-4 overflow-x-hidden">


        {games.map(game => (
            <div key={game.id} className="flex flex-col items-center  w-[440px]">
            <div className="relative w-full">
 
                <PortraitImageCrop src={game.imageUrl} alt={game.gameName} width='100%' height={151 } />
                <div className="absolute top-0 left-2  flex mt-2 items-center justify-center space-x-2 z-20">
                {game.data.prefix.map((prefix, index) => (
               <p key={index} id='' className="bg-lime-600 text-gray-100 roboto-condensed text-sm font-semibold pb-[1px]   px-2 rounded ">{prefix}</p>
                ))}

               <p className="text-gray-900 roboto-condensed font-semibold bg-gray-100 px-2 pb-[1px] text-sm rounded ">{game.data.version}</p>
                </div>
                </div>
                <div className="flex flex-col   w-full bg-[#1c1c1f] p-4">
                    <h2 className="bebas text-gray-100 text-xl font-semibold ">{game.data.gameName}</h2>

                    <div className="flex flex-row justify-between gap-x-2 w-full">
                    <div className="flex flex-row gap-x-2 text-sm text-white/50">
                    <div className="flex flex-row" >
                    <Eye className="w-3 h-3  self-center mr-[2px]" />
                        <p className=" orbitron  self-center ">{game.data.ratingCount} Views</p>
                     </div>

                     <div className="flex flex-row" >
                     <Link className="w-3 h-3  self-center mr-[2px]" />
                            <p className=" orbitron  self-center">{game.data.developerLinks.length} Links</p>
                            </div>
                            <div className="flex flex-row" >
                            <Star className="w-3 h-3  self-center mr-[2px]" />
                        <p className=" orbitron  self-center">{game.data.rating}</p>
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