import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const CarouselMobile = () => {
  const router = useRouter();
  const slides = [
    {
      title: "Explore the Mountains",
      description: "A young man moves into a new apartment, discovering a summoning circle and making a deal with a Demoness, gaining new physical...tools and abilities, in exchange for possibly losing his immortal soul!",
      imageUrl: "https://owo.lewd.ninja/images/games/b_46791_2e9193dcf1d84bc8224b8d501275b43c.jpg",
      type: "series",
      tags: ['VN', 'Adult']
    },
    {
      title: "Relax at the Beach",
      description: "A young man moves into a new apartment, discovering a summoning circle and making a deal with a Demoness, gaining new physical...tools and abilities, in exchange for possibly losing his immortal soul!",
      imageUrl: "https://attachments.f95zone.to/2023/06/2709366_L_RMF_007b.png",
      type: "series",
      tags: ['VN', 'Adult']
    },
    {
      title: "Adventure in the Desert",
      description: "A young man moves into a new apartment, discovering a summoning circle and making a deal with a Demoness, gaining new physical...tools and abilities, in exchange for possibly losing his immortal soul!",
      imageUrl: "https://owo.lewd.ninja/images/games/b_215751_211420354f5a6d542fe073bfb8cafa23.jpg",
      type: "series",
      tags: ['VN', 'Adult']
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 10000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const handleDragEnd = (event, info) => {
    const threshold = 50;
    if (info.offset.x > threshold && currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    } else if (info.offset.x < -threshold && currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  return (
    <div className="relative h-[50vh] mt-14 w-full overflow-hidden">
      <motion.div
        className="flex w-full h-full"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        animate={{ x: -currentSlide * 100 + '%' }}
        transition={{ 
          duration: 0.5,
          ease: "easeOut"
        }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="min-w-full h-full relative">
            <div className="z-20 absolute bottom-0 left-0 mx-2 w-[50vw] flex flex-col justify-between">
              <div>
                <h1 className="text-2xl font-bold mb-2 text-light_">
                  {slide.title}
                </h1>
              </div>
              
              <div className="space-y-4 my-2">
                <button 
                  className="w-fit rounded-full py-2 px-4 bg-accent_ text-primary_ 
                           flex items-center justify-center gap-1 text-sm hover:bg-hover_ transition-colors"
                  onClick={() => router.push('/game')}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Game Details
                </button>
              </div>
            </div>

            <div className="absolute w-full h-full">
              <Image
                src={slide.imageUrl}
                alt={slide.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        ))}
      </motion.div>

      <div className="absolute top-1/2 right-2 flex flex-col gap-2 z-30">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-3 w-3 rounded-full transition-colors ${
              idx === currentSlide ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default CarouselMobile;