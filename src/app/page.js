'use client';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import ContentRow from '@/components/ContentRow';
import Gallery from '@/components/Gallery';
import GalleryPills from '@/components/GalleryPills';
import FeaturedContent from '@/components/FeaturedContent';
import Carousel from '@/components/gamePage/Carousel';
import Filter from '@/components/widgets/Filter';
import { dummyGames } from '@/components/DummyGames';
import { Eye, ChevronRight, View } from 'lucide-react';
import Footer from '@/components/Footer';
import Trending from '@/components/widgets/Trending';
import ViewMore from '@/components/widgets/ViewMore';
import ViewAll from '@/components/widgets/ViewAll';
const LottieAnimation = dynamic(() => import('@/components/LottieAnimation'), { ssr: false });

import bubblesAnimation from "./lottie.json"; // Path to your Lottie JSON file


import CarouselMobile from '@/components/widgets/CarouselMobile';
export default function Home() {

  //ads

  
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true);

  const storeWithExpiry = (key, value, ttl) => {
    const now = new Date();
    const item = {
      value: value,
      expiry: now.getTime() + ttl
    };
    localStorage.setItem(key, JSON.stringify(item));
  };
  
  const getWithExpiry = (key) => {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;
  
    const item = JSON.parse(itemStr);
    const now = new Date();
  
    if (now.getTime() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }
  
    return item.value;
  };
  useEffect(() => {
    const fetchGames = async () => {
            try {

                  const cachedGameData = getWithExpiry('gameData');
                    if (cachedGameData){
                      setGames(cachedGameData);
                      setLoading(false);
                    }
                    else {
                      const response = await axios.get(`/api/games`, {
                        params: {
                                limit: 5
                        },
                      
                });
                
                setGames(response.data);
                
                setLoading(false);
                // Storing game data

                storeWithExpiry('gameData', response.data, 24 * 60 * 60 * 1000);

                    }
                
            } catch (error) {
                    console.error('Error:', error);
            }
    }

   
    fetchGames();
}, []);
  
if (loading) {
  return (
    <div className="min-h-screen bg-primary_ text-light_ flex items-center justify-center">
  
    <LottieAnimation animationData={bubblesAnimation} className="lottie-container" />
    
    </div>
  )
}
  

  return (
    <div
     className="relative min-h-screen flex flex-col justify-start">
      {/* full page gradient overlay */}
      <div className="absolute inset-0 bg-primary_" style={{ zIndex: -5 }}></div>
      <Navbar />

      <div className="flex flex-col items-start justify-center mt-4 sm:mt-8 md:mt-14">
        <div className="w-full px-0 sm:px-0 md:px-0">
          <div className="w-full hidden sm:block px-4 sm:px-0">
           <Carousel slides={games.featured} />
          </div>
          <div className="w-full block sm:hidden  sm:px-0">
          <CarouselMobile slides={games.featured} />
        </div>

   
        

        <div className=" sm:mt-24  w-full">
          <Trending games={games.trending}/>
          </div>
        
        <div className="mt-8 sm:mt-8 md:mt-14 w-full">
            <div className="flex items-start sm:items-center justify-between mb-4 md:mb-6 sm:px-6 md:px-8">
              <h1 className="text-xl sm:text-2xl text-white/80 font-semibold mb-2 sm:mb-0">
                Most Voted 
              </h1>
              <div className='hidden sm:block'>
              <ViewAll />

              </div>
            </div>

            <div className="w-full">
              <Gallery games={games.mostViewed} />
            </div>
          </div>


         

          
      
          <div className="mt-6 sm:mt-8 md:mt-14 w-full md:border-t-[1px] md:border-muted_ md:pt-6">
          

            <div className="grid md:mx-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 md:gap-4 md:gap-y-6">

          {/*trending */}
            <div className='flex flex-col mt-4 sm:mt-0'>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between  ">
                <h1 className="text-xl sm:text-2xl text-accent_ font-bold mb-2 sm:mb-4">
                Great Hit
                </h1>
            
              </div>
            <GalleryPills games={games.sandbox} />

            <ViewMore/>
         
            </div>

            
          {/*trending */}
          <div className='flex flex-col mt-2 sm:mt-0'>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between  ">
          <h1 className="text-xl sm:text-2xl text-accent_ font-bold mb-2 sm:mb-4">
          Most Popular
          </h1>
      
        </div>
        <GalleryPills games={games.twoDGame} />
        <ViewMore/>
   
      </div>

      
          {/*trending */}
          <div className='flex flex-col mt-2 sm:mt-0 '>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between  ">
          <h1 className="text-xl sm:text-2xl text-accent_ font-bold mb-2 sm:mb-4">
         Completed
          </h1>
      
        </div>
        <GalleryPills games={games.threDCG} />

        <ViewMore/>
      </div>

      
          {/*trending */}
          <div className='flex flex-col mt-2 sm:mt-0 '>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between  ">
          <h1 className="text-xl sm:text-2xl text-accent_ font-bold mb-2 sm:mb-4">
        Most Favourite
          </h1>
      
        </div>
        <GalleryPills games={games.voyeurism} />

        <ViewMore/>
   
      </div>

         
          
          
          </div>
          </div>

          
          <div className="mt-8 sm:mt-8 md:mt-14 w-full">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 md:mb-6 px-0 sm:px-6 md:px-8">
              <h1 className="text-xl sm:text-2xl text-white/80 font-semibold mb-2 sm:mb-0">
                Popular
              </h1>
              <div className='hidden sm:block'>
              <ViewAll />

              </div>
            </div>

            <div className="w-full">
            <Gallery games={games.popular} />
            </div>
         
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}