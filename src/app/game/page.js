

// GamePage.js
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
    const [activeTab, setActiveTab] = useState('overview');

    return (
        <div className="relative min-h-screen flex flex-col justify-start">
            <div className="absolute inset-0 bg-[rgb(17,17,17)]" style={{ zIndex: -5 }}></div>
            <Navbar />
            
            <motion.div 
                className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 z-20"
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <div className="mt-4 sm:mt-8 lg:mt-14 flex flex-col lg:flex-row gap-6">
                    {/* Game Card */}
                    <div className="w-full lg:w-[35%] flex flex-col items-start shadow-lg bg-[#181816] rounded-lg p-4">
                        <div className="w-full mb-4">
                            <Landscape
                                src={game.data?.bannerURL || game.imageUrl}
                                alt={game.data?.gameName || 'banner'}
                                height={200}
                            />
                        </div>
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl text-white mb-4 font-roboto font-semibold">
                            {game.data?.gameName}
                        </h1>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                                {game.data?.genre[0]}
                            </span>
                            <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                                {game.data?.releaseDate}
                            </span>
                        </div>

                        <div className="flex flex-wrap text-white items-center gap-2 sm:gap-4 mb-4">
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

                        <div className="mt-4">
                            <h2 className="text-xl sm:text-2xl text-white font-bold mb-4">Tags</h2>
                            <div className="flex flex-wrap gap-2">
                                {game.data?.tags?.map((tag, index) => (
                                    <span 
                                        key={index}
                                        className="bg-white/10 text-white px-3 py-1 rounded-full text-sm"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Game Info */}
                    <div className="w-full lg:w-[65%] shadow-lg bg-[#181816] rounded-lg p-4">
                        <div className="flex space-x-4 border-b-[1px] border-white/10 overflow-x-auto">
                            <button 
                                className={`px-4 py-2 whitespace-nowrap ${
                                    activeTab === 'overview' 
                                    ? 'text-primary-500 text-lg border-b-[1px] border-primary-500' 
                                    : 'text-white'
                                }`}
                                onClick={() => setActiveTab('overview')}
                            >
                                Overview
                            </button>
                            <button 
                                className={`px-4 py-2 whitespace-nowrap ${
                                    activeTab === 'links' 
                                    ? 'text-primary-500 text-lg border-b-[1px] border-primary-500' 
                                    : 'text-white'
                                }`}
                                onClick={() => setActiveTab('links')}
                            >
                                Links
                            </button>
                            <button 
                                className={`px-4 py-2 whitespace-nowrap ${
                                    activeTab === 'screenshots' 
                                    ? 'text-primary-500 text-lg border-b-[1px] border-primary-500' 
                                    : 'text-white'
                                }`}
                                onClick={() => setActiveTab('screenshots')}
                            >
                                Screenshots
                            </button>
                        </div>

                        {activeTab === 'overview' && (
                            <div className="flex flex-col gap-4 bg-white/5 rounded-lg p-4 sm:p-6 text-white mt-4">
                                <h3 className="text-lg sm:text-xl font-semibold">Developer Information</h3>
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

                                <h3 className="text-lg sm:text-xl font-semibold">Operating Systems</h3>
                                <div className="flex flex-wrap gap-3">
                                    {game.data?.operatingSystem?.map((os, index) => (
                                        <span 
                                            key={index}
                                            className="bg-white/10 px-4 py-2 rounded hover:bg-white/20 transition"
                                        >
                                            {os}
                                        </span>
                                    ))}
                                </div>

                                <h3 className="text-lg sm:text-xl font-semibold">Last Update</h3>
                                <div className="bg-white/10 px-4 py-2 rounded hover:bg-white/20 transition w-fit">
                                    {new Date(game.data?.lastUpdateDate).toLocaleDateString()}
                                </div>

                                <h3 className="text-lg sm:text-xl font-semibold">Languages</h3>
                                <div className="bg-white/10 px-4 py-2 rounded hover:bg-white/20 transition w-fit">
                                    {game.data?.language}
                                </div>
                            </div>
                        )}

                        <div className="mt-6">
                            <h2 className="text-xl sm:text-2xl text-white font-bold mb-4">Screenshots</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                    </div>
                </div>
            </motion.div>
        </div>
    );
}