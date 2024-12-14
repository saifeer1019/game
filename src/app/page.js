'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import ContentRow from '@/components/ContentRow';
import Gallery from '@/components/Gallery';
import FeaturedContent from '@/components/FeaturedContent';
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
    description: "A mind-bending journey through space and time, exploring the boundaries of human consciousness.",
    imageUrl: "https://lewdflix.com/wp-content/uploads/2024/06/AcquaintedBackdrop-1800x715.webp",
    type: "series"
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Featured Content */}
      <FeaturedContent featuredContent={featuredContent} />

   

      <Gallery />
    </div>
  );
} 