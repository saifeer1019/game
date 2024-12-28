'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import ContentRow from '@/components/ContentRow';
import Gallery from '@/components/Gallery';
import FeaturedContent from '@/components/FeaturedContent';
import Filter from '@/components/widgets/Filter';
import { Eye } from 'lucide-react';
import Footer from '@/components/Footer';
export default function Home() {
  const [categories] = useState([
    { 
      title: 'Trending Now',
      items: Array(6).fill({}).map((_, i) => ({
        title: `Trending Movie ${i + 1}`,
        imageUrl: `/thumbnail-${i + 1}.jpg`
      }))
    },
    { 
      title: 'Popular on Netflix',
      items: Array(6).fill({}).map((_, i) => ({
        title: `Popular Movie ${i + 1}`,
        imageUrl: `/thumbnail-${i + 1}.jpg`
      }))
    },
  ]);

  const featuredContent = {
    title: "Heartstrings",
    description: "A young man moves into a new apartment, discovering a summoning circle and making a deal with a Demoness, gaining new physical...tools and abilities, in exchange for possibly losing his immortal soul!",
    imageUrl: "https://owo.lewd.ninja/images/games/b_46791_2e9193dcf1d84bc8224b8d501275b43c.jpg",
    type: "series",
    tags: ['VN', 'Adult']
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-start">
      {/* full page gradient overlay */}
      <div className="absolute inset-0 bg-primary_" style={{ zIndex: -5 }}></div>
      <Navbar />

      <div className="flex flex-col items-start justify-center mt-4 sm:mt-8 md:mt-14">
        <div className="w-full px-4 sm:px-6 md:px-0">
          <div className="w-full px-4 sm:px-0">
            <FeaturedContent featuredContent={featuredContent} />
          </div>

          <div className="mt-6 sm:mt-8 md:mt-14 w-full">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 md:mb-6 px-4 sm:px-6 md:px-8">
              <h1 className="text-xl sm:text-2xl text-white/80 font-semibold mb-2 sm:mb-0">
                New Games
              </h1>
              <button className="flex items-center gap-x-1 border border-light_ px-2 py-1 text-light_ text-sm sm:text-sm hover:bg-cyan-500/10 transition-colors">
                <Eye className="w-4 h-4 sm:w-4 sm:h-4" />
                <span>View All</span>
              </button>
            </div>

            <div className="w-full">
              <Gallery />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}