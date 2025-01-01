

// GamePage.js
"use client"
import Banner from "@/components/gamePage/Banner";
import { dummyGames } from "@/components/DummyGames";
import Gallery from "@/components/gamePage/Gallery";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
            <div className="absolute inset-0 bg-primary_" style={{ zIndex: -5 }}></div>
            <Navbar />
            
            <motion.div 
                className="relative py-6  z-20 flex flex-col gap-y-4 mt-4 sm:mt-8 lg:mt-14"
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
            <div className="relative w-full mb-4">
                    <div 
                    className="absolute inset-0 z-20"
                    style={{
                    background: 'linear-gradient(to right, rgba(17, 17, 17, 1) 0%, rgba(17, 17, 17, 0.8) 5%, rgba(17, 17, 17, 0.1) 15%,  transparent 100%)'
                }}
                />
            
                <div 
                className="absolute inset-0 z-20"
                style={{
                    background: 'linear-gradient(to left, rgba(17, 17, 17, 1) 0%, rgba(17, 17, 17, 0.8) 5%, rgba(17, 17, 17, 0.1) 15%, transparent 100%)'
                }}
                />
            
                <div 
                className="absolute inset-0 z-20"
                style={{
                background: 'linear-gradient(to bottom, rgba(17, 17, 17, 1) 0%, rgba(17, 17, 17, 0.8) 5%, rgba(17, 17, 17, 0.1) 15%, transparent 100%)'
                }}
            />
            
            <div 
            className="absolute inset-0 z-20"
            style={{
                background: 'linear-gradient(to top, rgba(17, 17, 17, 1) 0%, rgba(17, 17, 17, 0.8) 5%, rgba(17, 17, 17, 0.1) 15%, transparent 100%)'
            }}
            />
            <Landscape
                src={game.data?.bannerURL || game.imageUrl}
                alt={game.data?.gameName || 'banner'}
                height={350}
                className="absolute inset-0 z-10 object-cover"
            />
        </div>
             <div className="  border border-muted_ p-4 sm:p-6 mx-6 rounded-[10px] shadow-xl flex flex-col gap-4">
                <div className="  flex flex-col lg:flex-row gap-4">
                    {/* Game Card */}
                    <div className="w-full lg:w-[50%] flex flex-col items-start shadow-lg bg-primary_ rounded-lg ">
                       
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl text-white mb-4 font-roboto font-semibold">
                            {game.data?.gameName}
                        </h1>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                            <span className="bg-white/20 px-3 py-1 rounded text-white transition">
                                {game.data?.genre[0]}
                            </span>
                            <span className="bg-white/20 px-3 py-1 rounded text-white">
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
                    <div className="w-full lg:w-[65%]  bg-primary_ rounded-lg ">
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
                                className={` px-4 py-2 whitespace-nowrap ${
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
                            <div className="flex flex-col gap-4 bg-primary_ rounded-lg p-4 sm:p-4 text-white ">
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



                        {/*links*/}
                            {activeTab === 'links' && (
                            <div className="flex flex-col gap-4 bg-primary_ rounded-lg p-4 sm:p-4 text-white ">
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


                        {/*More Info*/}

                            {activeTab === 'screenshots' && (
                            <div className="flex flex-col gap-4 bg-primary_ rounded-lg p-4 sm:p-4 text-white ">
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

                       
                    </div>


                        
                </div>


                 <div className="mt-6 ">
                            <h2 className="text-xl sm:text-2xl text-white font-bold mb-4">Screenshots</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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

                <div className="bg-light_ w-[80vw] h-[20vh] self-center my-4 text-center text-4xl">
                Ad
                </div>
                <div className="flex flex-col gap-8">
                <h1 className="text-xl sm:text-2xl text-white/80 font-semibold mt-8 sm:mb-0 mx-8">More games like this</h1>
                        <Gallery slice={4} heading={"Related Games"} gap={4} />
                        </div>

                        <div className="bg-light_ w-[80vw] h-[20vh] self-center my-4 text-center text-4xl">
                        Ad
                        </div>
            </motion.div>
            <Footer />
        </div>
    );
}