"use client";


import { useParams } from "next/navigation";
import React from 'react';
import { Share2, Download, Eye, Calendar, Star, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from "react";
import axios from 'axios';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LottieAnimation from "@/components/LottieAnimation";
import bubblesAnimation from "../lottie.json"; // Path to your Lottie JSON file
import Gallery from "@/components/gamePage/Gallery";
import ScreenshotGallery from "@/components/gamePage/ScreenShotsGallery";
const GamePage = () => {
    const {id} = useParams();
    console.log(id)
  const [game, setGame] = useState();
  const [relatedGames, setRelatedGames] = useState();
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchGame = async () => {
            try {
                    let response = await axios.get(`/api/game?slug=${id}`);
                    setGame(response.data);

                    let response_ = await axios.get(`/api/relatedGames?genre=${`Sandbox`}`);
                    setRelatedGames(response_.data);

            } catch (error) {
                    console.error('Error:', error);
            }
    }
    fetchGame();
}, []);
  if (!game) {
    return (
      <div className="min-h-screen bg-primary_ text-light_ flex items-center justify-center">
    
      <LottieAnimation animationData={bubblesAnimation} className="lottie-container" />
      
      </div>
    )
  }


   

  return (
    <div className="min-h-screen bg-primary_ text-light_">
    <Navbar />
      {/* Hero Section */}
      <div className="w-full    bg-secondary_  pb-4 pt-20 md:pt-22 md:pb-8">
        <div className="mx-auto max-w-[90vw] flex flex-col md:flex-row gap-6">
          {/* Banner Image */}
          <div className="md:w-1/3 flex flex-col gap-4">
            <div className="relative aspect-[20/11] w-full rounded-lg overflow-hidden">
              <Image 
                src={game.data.bannerURL} 
                alt={game.data.gameName}
                layout="fill"
                objectFit="cover"
                className="hover:scale-105 transition-transform duration-300"
              />
            </div>


            <div className="hidden md:block space-y-4">
            <h2 className="text-2xl font-bold">Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-muted_">Genre</h3>
                <div className="flex flex-wrap gap-2 mt-1">
                  {game.data.genre.map(g => (
                    <span key={g} className="px-2 py-1 bg-secondary_ rounded text-sm">
                      {g}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-muted_">Platform</h3>
                <div className="flex flex-wrap gap-2 mt-1">
                  {game.data.operatingSystem.map(os => (
                    <span key={os} className="px-2 py-1 bg-secondary_ rounded text-sm">
                      {os}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-muted_">Language</h3>
                <p>{game.data.language}</p>
              </div>
              <div>
                <h3 className="text-muted_">Version</h3>
                <p>{game.data.version}</p>
              </div>
            </div>
          </div>
          </div>

          

          {/* Game Info */}
          <div className="md:w-2/3 space-y-4">
            <div className="space-y-2">
              <div className="flex gap-2 flex-wrap">
                {game.data.prefix.map(tag => (
                  <span key={tag} className="px-2 py-1 bg-accent_ text-white text-sm rounded">
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-light_">{game.data.gameName}</h1>
              <p className="text-muted_ text-lg">by {game.data.developerName}</p>
            </div>

            <div className="flex gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-accent_" />
                <span>{game.data.releaseDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-accent_" />
                <span>{game.data.rating}/5</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-accent_" />
                <span>{game.views} views</span>
              </div>
            </div>

            <div className="flex gap-4">
              <button className="px-6 py-2 bg-accent_ hover:bg-hover_ transition-colors rounded-md flex items-center gap-2">
                <Download className="w-5 h-5" />
                Download
              </button>
              <button className="px-6 py-2 border border-accent_ text-accent_ hover:bg-accent_/10 transition-colors rounded-md flex items-center gap-2">
                <Share2 className="w-5 h-5" />
                Share
              </button>
            </div>

            <div className="mt-6">
            {/* Tab Headers */}
            <div className="flex gap-4 border-b border-muted_/20 mb-6">
              <button
                onClick={() => setActiveTab('overview')}
                className={`pb-2 px-4 text-lg font-semibold transition-colors relative ${
                  activeTab === 'overview'
                    ? 'text-accent_ border-b-2 border-accent_'
                    : 'text-muted_ hover:text-light_'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('links')}
                className={`pb-2 px-4 text-lg font-semibold transition-colors relative ${
                  activeTab === 'links'
                    ? 'text-accent_ border-b-2 border-accent_'
                    : 'text-muted_ hover:text-light_'
                }`}
              >
                Download Links
              </button>
            </div>
          
            {/* Tab Content */}
            <div className=""> {/* Fixed minimum height to prevent layout shift */}
              {activeTab === 'overview' && (
                <div className="animate-fadeIn">
                  <p className="text-muted_ leading-relaxed">{game.data.overview}</p>
                </div>
              )}
              
              {activeTab === 'links' && (
                <div className="animate-fadeIn">
                  <div className="space-y-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {game.links.links.map((link, index) => (
                      <a
                        key={index}
                        href={link.link}
                        className="flex items-center justify-between p-4 bg-secondary_ rounded-lg hover:bg-accent_/10 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <Download className="w-5 h-5 text-accent_" />
                          <span>{link.name}</span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-accent_" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>


          <div className="block md:hidden space-y-4">
          <h2 className="text-2xl font-bold">Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-muted_">Genre</h3>
              <div className="flex flex-wrap gap-2 mt-1">
                {game.data.genre.map(g => (
                  <span key={g} className="px-2 py-1 bg-secondary_ rounded text-sm">
                    {g}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-muted_">Platform</h3>
              <div className="flex flex-wrap gap-2 mt-1">
                {game.data.operatingSystem.map(os => (
                  <span key={os} className="px-2 py-1 bg-secondary_ rounded text-sm">
                    {os}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-muted_">Language</h3>
              <p>{game.data.language}</p>
            </div>
            <div>
              <h3 className="text-muted_">Version</h3>
              <p>{game.data.version}</p>
            </div>
          </div>
        </div>



                                  {/* Screenshots */}
       {/* <div>
        <h2 className="text-2xl font-bold mb-4">Screenshots</h2>
        <div className="grid grid-cols-2 md:grid-cols-3  gap-4">
          {game.data.images.slice(0, 8).map((image) => (
            <div key={image.id} className="relative aspect-video rounded-lg overflow-hidden">
              <Image
                src={image.url}
                alt={image.alt}
                layout="fill"
                objectFit="cover"
                className="hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>*/}

      <ScreenshotGallery images={game.data.images} />

       


          </div>

          
        </div>
        <div className="max-w-[90vw] mx-auto mt-8">
        {relatedGames && (       <h1 className="text-xl w-full pt-4 md:mt-10 mb-4 text-light_ sm:text-2xl  sm:font-bold font-roboto font-semibold">
          More games like this
       </h1>)}
           <Gallery games={relatedGames} slice={8} heading="Related Games" flex='side' />
          
           </div>
     
      </div>

      {/* Details Section */}
      <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
       

        {/* Game Details */}
        <div className="grid md:grid-cols-2 gap-8">
       
        
       
        </div>
        
      </div>
      
      <Footer />
     
    </div>
  );
};

export default GamePage;