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
    <div className="px-10 mt-10 overflow-x-hidden">
    <h2 className="text-xl font-bold mb-4">
    Popular </h2>
    <div className="grid grid-cols-4 gap-4 ">


        {games.map(game => (
            <div key={game.id} className="flex flex-col items-center ">
            <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/30 z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30 z-10" />
                <PortraitImageCrop src={game.imageUrl} alt={game.gameName} width={400} height={133 } />
                <div className="absolute top-0 left-2  flex mt-2 items-center justify-center space-x-2 z-20">
                {game.data.prefix.map((prefix, index) => (
               <p key={index} id='' className="bg-lime-600 text-gray-100 roboto-condensed text-xs font-semibold pb-[1px]   px-2 rounded-lg ">{prefix}</p>
                ))}

               <p className="text-gray-900 roboto-condensed font-semibold bg-gray-100 px-2 pb-[1px]   text-xs rounded-lg ">{game.data.version}</p>
                </div>
                </div>
                <div className="flex flex-col  py-2 pr-2 w-full ">
                    <h3 className="bebas ">{game.data.gameName}</h3>

                    <div className="flex flex-row justify-between gap-x-2 w-full">
                    <div className="flex flex-row gap-x-2">
                    <div className="flex flex-row" >
                    <Eye className="w-3 h-3 text-gray-500 self-center mr-[2px]" />
                        <p className="text-xs orbitron text-gray-500 self-center ">{game.data.ratingCount} Views</p>
                     </div>

                     <div className="flex flex-row" >
                     <Link className="w-3 h-3 text-gray-500 self-center mr-[2px]" />
                            <p className="text-xs orbitron text-gray-500 self-center">{game.data.developerLinks.length} Links</p>
                            </div>
                            <div className="flex flex-row" >
                            <Star className="w-3 h-3 text-gray-500 self-center mr-[2px]" />
                        <p className="text-xs orbitron text-gray-500 self-center">{game.data.rating}</p>
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