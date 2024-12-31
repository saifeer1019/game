import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

const Carousel = () => {
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

  const handleNext = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative h-[75vh] w-full bg-gray-900 flex items-center justify-center overflow-hidden">
      {/* Navigation Buttons */}
      <div className='absolute bottom-0 right-4 z-30 transform -translate-y-1/2 flex flex-col gap-2'>
      <button
        className=" bg-white/20 p-3 rounded-xl text-white z-30"
        onClick={handlePrev}
      >
        &#8249;
      </button>
      <button
        className=" bg-white/20 p-3 rounded-xl text-white z-30"
        onClick={handleNext}
      >
        &#8250;
      </button></div>

      <AnimatePresence>
        {slides.map((slide, index) => (
          index === currentSlide && (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: "0%" }}
              exit={{ opacity: 0, x: "-100%" }}
              transition={{ duration: 0.5 }}
              className="absolute overflow-hidden h-[75vh] gap-6 bg-primary_  w-full"
            >

            <div className="w-full z-20 md:absolute md:bottom-4 md:left-10 z- md:w-1/2 flex flex-col justify-between">
            <div>
              <h1 className="text-2xl md:text-4xl font-bold mb-4 text-light_">
                {slide.title}
              </h1>
              <p className="text-sm md:text-base w-[80%] text-neutral-300 mb-4 leading-relaxed">
                {slide.description}
              </p>
            </div>
    
            <div className="space-y-4">
              {/* Main Button */}
              <button 
                className="w-full rounded md:w-auto px-6 py-3 bg-accent_  text-light_  
                         flex items-center justify-center gap-2 hover:bg-hover_ transition-colors"
                onClick={() => router.push('/game')}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Game Details
              </button>
    
              {/* Tags Container */}
              <div className="flex flex-wrap gap-2">
           <button className="text-xs self-end  px-4 py-1 bg-secondary_ text-light_ rounded flex items-center hover:bg-opacity-80 cursor-pointer" onClick={() => {
                router.push(`/game`);
              }}>
          
              {slide.tags[0]}
              </button>
    
              <button className="text-xs self-end  px-4 py-1 bg-secondary_ text-light_ rounded flex items-center hover:bg-opacity-80 cursor-pointer" onClick={() => {
                router.push(`/game`);
              }}>
           
              {slide.tags[1]}
              </button>
      { /*   <div className=' flex gap-x-2 self-end  h-fit '>
          <div className='rounded orbitron bg-yellow-700 text-sm h-fit px-3 py-1 text-white/80'>
          <p className=''> {slide.tags[0]}</p>
          </div>
    
          <div className='rounded orbitron bg-rose-700 text-sm h-fit  px-3 py-1 text-white/80'>
          <p className=''> {slide.tags[1]}</p>
          </div>
    
          </div>*/}
              </div>
            </div>
          </div>


            <div className="absolute right-0 w-full md:w-9/12 h-[300px] md:h-full rounded-lg overflow-hidden z-10">
              <div 
              className="absolute inset-0 z-20"
              style={{
                background: 'linear-gradient(to right, rgba(17, 17, 17, 1) 0%, rgba(17, 17, 17, 0.8) 10%, rgba(17, 17, 17, 0.1) 30%, transparent 100%)'
            }}
            />
        
            <div 
            className="absolute inset-0 z-20"
            style={{
              background: 'linear-gradient(to left, rgba(17, 17, 17, 1) 0%, rgba(17, 17, 17,0.8) 10%, rgba(36, 36, 40, 0.1) 30%, transparent 100%)'
            }}
          />
        
          <div 
          className="absolute inset-0 z-20"
          style={{
            background: 'linear-gradient(to bottom, rgba(17, 17, 17, 1) 0%, rgba(17, 17, 17, 0.8) 10%, rgba(17, 17, 17, 0.4) 25%, rgba(17, 17, 17, 0.1) 35%, transparent 100%)'
          }}
        />
        
        <div 
        className="absolute inset-0 z-20"
        style={{
          background: 'linear-gradient(to top, rgba(17, 17, 17, 1) 0%, rgba(17, 17, 17, 0.8) 5%, rgba(17, 17, 17, 0.1) 15%, transparent 100%)'
        }}
        />
        <Image
        src={slide.imageUrl}
        alt={slide.title}
        fill
        className="object-cover"
        priority
      />
              </div>


         
            </motion.div>
          )
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Carousel;