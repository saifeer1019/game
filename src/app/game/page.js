"use client"
import Banner from "@/components/gamePage/Banner";
import { dummyGames } from "@/components/DummyGames";
import Navbar from "@/components/Navbar";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Landscape from "@/components/widgets/Landscape";
import Image from "next/image";
import { motion } from "framer-motion";

export default function GamePage() {
    const { id } = useParams();
    const [game, setGame] = useState(dummyGames[0]);
    const imageUrl = game.imageUrl;

    // useEffect(() => {
    //     fetch(`/api/game/${id}`)
    //         .then(response => response.json())
    //         .then(data => setGame(data));
    // }, [id]);
    return (
        <div className="relative min-h-screen">
      {/* Blurred Banner Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center filter blur-lg opacity-50" 
        style={{ 
          backgroundImage: `url(${game.data.bannerURL})`,
          zIndex: -2 
        }}
      />

      {/* Netflix-like Gradient Overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/90" 
        style={{ zIndex: -1 }}
      />
        
        <Navbar />
        
        {/* Hero Section with Margin */}

        <Banner game={game} />
        {/* Adjusted margin for better contrast */}
      
   
            {/* Additional Info Section */}
            <motion.div className="px-8 py-12 z-20"
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}> {/* Adjusted z-index to ensure visibility */}
                <div className="max-w-7xl mx-auto">
                


                    <h1 className="text-4xl font-bold mb-4">{game.data?.gameName}</h1>
                    
                    <div className="flex items-center gap-4 mb-4">
                        <span className="bg-white/20 px-3 py-1 rounded">
                            {game.data?.version}
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="text-yellow-400">★</span>
                            {game.data?.rating}
                        </span>
                        <span>{game.data?.language}</span>
                    </div>

                    <p className="text-gray-300 mb-6 line-clamp-3">
                        {game.data?.overview}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                        {game.data?.genre?.slice(0, 5).map((tag, index) => (
                            <span 
                                key={index}
                                className="bg-white/10 px-3 py-1 rounded-full text-sm"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

              


                        {/* Developer Info */}
                    <div className="mb-8 z-10">
                        <h2 className="text-2xl font-bold mb-4">Developer Information</h2>
                        <div className="bg-white/5 rounded-lg p-6">
                            <h3 className="font-semibold mb-2">{game.data?.developerName}</h3>
                            <div className="flex flex-wrap gap-3">
                                {game.data?.developerLinks?.map((link, index) => (
                                    <a 
                                        key={index}
                                        href={link.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-white/10 px-4 py-2 rounded hover:bg-white/20 transition"
                                    >
                                        {link.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Screenshots Gallery */}
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Screenshots</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {game.data?.images?.slice(0, 8).map((image, index) => (
                                <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
                                    <Image
                                        src={image.url}
                                        alt={image.alt}
                                        fill
                                        className="object-cover hover:scale-110 transition duration-300"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
          


                  {/* Tags Section */}
                  <div className="mt -8">
                  <h2 className="text-2xl font-bold mb-4">Tags</h2>
                  <div className="flex flex-wrap gap-2">
                      {game.data?.tags?.map((tag, index) => (
                          <span 
                              key={index}
                              className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-sm"
                          >
                              {tag}
                          </span>
                      ))}
                  </div>
              </div>


                </div>
            </motion.div>
        </div>
    );
}