'use client'; 

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import ContentRow from '@/components/ContentRow';
import Gallery from '@/components/Gallery';
import FeaturedContent from '@/components/FeaturedContent';
import Filter from '@/components/widgets/Filter';
import { Eye } from 'lucide-react';
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
    // Add more categories as needed
  ]);

  const featuredContent = {
    title: "Heartstrings",
    description: "A young man moves into a new apartment, discovering a summoning circle and making a deal with a Demoness, gaining new physical...tools and abilities, in exchange for possibly losing his immortal soul!",
    imageUrl: "https://lewdflix.com/wp-content/uploads/2024/06/AcquaintedBackdrop-1800x715.webp",
    type: "series",
    tags: ['VN', 'Adult']
  };

  return (
      <div className="relative min-h-screen flex flex-col justify-start">
    {/* full page gradient overlay */}
    <div className="absolute inset-0 bg-[rgb(17,17,17)]" style={{ zIndex: -5 }}></div>
    <Navbar />

<div className="flex flex-col items-start justify-center mt-14">
<div className='mx-10'>
      <FeaturedContent featuredContent={featuredContent} />

      
 
        <div className="mt-10 self-start">
        <div className='flex my-2'>
        <h1 className='my-4 text-2xl text-white/80 font-semibold w-fit'>New Games</h1>
        <button className='border border-cyan-500 h-fit self-center px-2 py-1 text-cyan-500 flex mx-4 gap-x-2 '>
        <Eye></Eye>
        View All</button>
        </div>
    
        <Gallery />
        </div>
</div>

    </div>
    </div>
);
} 