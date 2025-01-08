// GamePage.js
"use client";
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
import {Info, Download} from "lucide-react"

export default function GamePage() {
  const { id } = useParams();
  const [game, setGame] = useState(dummyGames[1]);
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background */}
      <div className="absolute inset-0 bg-primary_" style={{ zIndex: -5 }}></div>

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <motion.div
        className="relative flex flex-col gap-y-8 px-0 lg:px-8 mt-8 lg:mt-14"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Banner and Game Card */}
        <div className="relative flex flex-col">
          {/* Banner */}
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
      height={300}
      className="absolute inset-0 z-10 object-cover"
  />
</div>

          {/* Game Card */}
          <div className="relative -mt-24 lg:-mt-8 z-20  p-6 sm:p-8 bg-secondary_ border-t sm:border border-muted_ sm:rounded-[20px] shadow-lg">
          <div className="  flex flex-col lg:flex-row gap-4">
                    {/* Game Card */}
                    <div className="w-full  flex flex-col items-start shadow-lg bg-secondary_ rounded-lg ">
                       <div className="w-full flex justify-between gap-8 items-center h-fit sm:mb-4">
                       
                       <h1 className="text-2xl w-[40vw] sm:w-fit  overflow-hidden  sm:text-3xl sm:font-bold text-white font-roboto font-semibold">
                            {game.data?.gameName}
                        </h1>
                         <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
                                  {/* Main Button */}
            <button 
            className="w-full rounded md:w-auto  px-2 py-1 sm:rounded-[5px] bg-accent_  text-light_   sm:text-base
                     flex items-center justify-center gap-2 sm:justify-self-end hover:bg-hover_ transition-colors"
            onClick={() => router.push('/game')}
          >
            <Download className="w-4 h-4" />
            Download
          </button>

          <button 
          className="w-full hidden  rounded md:w-auto sm:justify-self-end  px-2 py-1 self-center bg-gray-500  text-white   sm:text-base
                   sm:flex items-center j sm:rounded-[5px]ustify-center gap-2 hover:bg-gray-800 transition-colors"
          onClick={() => router.push('/game')}
        >
           <Info className="w-4 h-4"  />
          Game Info
        </button>
          </div>
          </div>
                        
                        
                        <div className="flex items-center  gap-2 mb-4 text-sm text-light_ ">
                            <span className="bg-white/20  px-2 py-1 text-center rounded-[5px]  transition">
                                {game.data?.genre[0]}
                            </span>
                            <span className="bg-white/20 px-2 py-1 rounded-[5px] ">
                                {game.data?.releaseDate}
                            </span>
                              <span className="bg-white/20 px-2 py-1 text-sm rounded-[5px]">
                                {game.data?.version}
                            </span>

                            <span className="bg-white/20 px-2 py-1 text-sm rounded-[5px]">
                                {game.data?.version}
                            </span>
                            <span className="flex items-center gap-1">
                                <span className="text-yellow-400">★</span>
                                {game.data?.rating}
                            </span>
                            <span>{game.data?.language}</span>
                        </div>

                        <div className="flex flex-wrap text-white items-center gap-2 sm:gap-4 mb-4">
                            
                        </div>

                        <p className="text-gray-300  mb-6 line-clamp-3">
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

                           {/* Ads */}
        <div className="bg-gray-600  sm:my-10 w-full  h-[20vh] mx-auto flex items-center justify-center text-4xl text-white">
        Ad
      </div>
                                        {/* Tabs */}
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
                        <div className="flex flex-col gap-4 bg-secondary_ rounded-lg p-4 sm:p-4 text-white ">
                            <h3 className="text-lg sm:text-lg font-semibold">Developer Information</h3>
                            <div className="flex flex-wrap gap-3">
                                {game.data?.developerLinks?.map((link, index) => (
                                    <a 
                                        key={index}
                                        href={link.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-white/10 px-2 py-1 rounded hover:bg-white/20 transition"
                                    >
                                        {link.name}
                                    </a>
                                ))}
                            </div>

                            <h3 className="text-lg sm:text-lg font-semibold">Operating Systems</h3>
                            <div className="flex flex-wrap gap-3">
                                {game.data?.operatingSystem?.map((os, index) => (
                                    <span 
                                        key={index}
                                        className="bg-white/10 px-2 py-1 rounded hover:bg-white/20 transition"
                                    >
                                        {os}
                                    </span>
                                ))}
                            </div>

                            <h3 className="text-lg sm:text-lg font-semibold">Last Update</h3>
                            <div className="bg-white/10  px-2 py-1 rounded hover:bg-white/20 transition w-fit">
                                {new Date(game.data?.lastUpdateDate).toLocaleDateString()}
                            </div>

                            <h3 className="text-lg sm:text-lg font-semibold">Languages</h3>
                            <div className="bg-white/10  px-2 py-1 rounded hover:bg-white/20 transition w-fit">
                                {game.data?.language}
                            </div>
                        </div>
                    )}



                    {/*links*/}
                        {activeTab === 'links' && (
                        <div className="flex flex-col gap-4 bg-secondary_ rounded-lg p-4 sm:p-4 text-white ">
                            <h3 className="text-lg sm:text-xl font-semibold">Developer Information</h3>
                            <div className="flex flex-wrap gap-3">
                                {game.data?.developerLinks?.map((link, index) => (
                                    <a 
                                        key={index}
                                        href={link.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-white/10  px-2 py-1 rounded hover:bg-white/20 transition"
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
                        <div className="flex flex-col gap-4 bg-secondary_ rounded-lg p-4 sm:p-4 text-white ">
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

                    {/* Game Info */}
                    <div className="w-full lg:w-[35%]  bg-secondary_ rounded-lg ">

                     <h1 className="text-2xl w-full sm:w-fit sm:mb-6 overflow-hidden self-start sm:mx-6 sm:text-lg text-white mb-4 font-roboto font-semibold">
       More games like this
    </h1>
        <Gallery slice={4} heading="Related Games" flex='side' />
                    

                       
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
        </div>

        {/* Ads */}
        <div className="bg-gray-600 w-[80vw] h-[20vh] sm:my-10 mx-auto flex items-center justify-center text-4xl text-white">
          Ad
        </div>

        {/* Related Games */}

       

     
      </motion.div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
