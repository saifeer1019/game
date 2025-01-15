import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, AnimatePresence } from 'framer-motion';
  import Image from 'next/image';
import { useRouter } from 'next/navigation';

const SPRING_OPTIONS = {
  type: "spring",
  stiffness: 100,
  damping: 20,
};

const DRAG_THRESHOLD = 100; // More forgiving buffer for smoother user experience.
const ONE_SECOND = 1000;
const AUTO_DELAY = ONE_SECOND * 10;
const DRAG_BUFFER = 50;

const Carousel = ({slides}) => {
  const router = useRouter();


  const [currentSlide, setCurrentSlide] = useState(0);
  const dragX = useMotionValue(0);

  useEffect(() => {
   
    const intervalRef = setInterval(() => {
      const x = dragX.get();
      if (x === 0) {
        setCurrentSlide((prev) => {
          if (prev === slides.length - 1) {
            return 0;
          }
          return prev + 1;
        });
      }
    }, AUTO_DELAY);
    return () => clearInterval(intervalRef);
  }, [slides]);

  const onDragEnd = (event, info) => {
    if (info.offset.x < -DRAG_THRESHOLD && currentSlide < slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    } else if (info.offset.x > DRAG_THRESHOLD && currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  };
  const handleNext = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative h-[75vh]  sm:mt-0 w-full bg-primary_ flex items-center justify-center overflow-hidden">
      {/* Navigation Buttons */}
      <div className='absolute bottom-0 right-4 z-30 transform -translate-y-1/2 flex flex-col gap-2'>
        <button
          className="bg-white/20 p-3 rounded-xl text-white z-30"
          onClick={handlePrev}
        >
          &#8249;
        </button>
        <button
          className="bg-white/20 p-3 rounded-xl text-white z-30"
          onClick={handleNext}
        >
          &#8250;
        </button>
      </div>

      <motion.div
        drag="x"
        dragConstraints={{
          left: 0,
          right: 0,
        }}
        style={{
          x: dragX,
        }}
        animate={{
          translateX: `-${currentSlide * 100}%`,
        }}
        transition={SPRING_OPTIONS}
        onDragEnd={onDragEnd}
        className="flex cursor-grab active:cursor-grabbing w-full h-full bg-primary_"
      >
        { slides && slides.map((slide, index) => (
          <motion.div
            key={index}
            className="w-screen shrink-0 relative h-full bg-primary_ "
            animate={{
              scale: currentSlide === index ? 1 : 0.95,
            }}
            transition={SPRING_OPTIONS}
          >
          <div className="w-full z-20 md:absolute md:bottom-4 md:left-10 z- md:w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-2xl md:text-4xl font-bold mb-4 text-light_">
              {slide.data.gameNametitle}
            </h1>
            <p className="text-sm md:text-base w-[80%] text-neutral-300 mb-4 leading-relaxed">
              {slide.data.overview.slice(0, 180)}
            </p>
          </div>
  
          <div className="space-y-4">
            {/* Main Button */}
            <button 
              className="w-full rounded md:w-auto px-6 py-3 bg-accent_  text-light_  
                       flex items-center justify-center gap-2 hover:bg-hover_ transition-colors"
              onClick={() => router.push('/game/' + slide.id)}
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
        
            {slide.data.genre[0]}
            </button>
  
            <button className="text-xs self-end  px-4 py-1 bg-secondary_ text-light_ rounded flex items-center hover:bg-opacity-80 cursor-pointer" onClick={() => {
              router.push(`/game`);
            }}>
         
            {slide.data.genre[1]}
            </button>
        { /*<div className=' flex gap-x-2 self-end  h-fit '>
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

            <div className="absolute right-0 w-full md:w-9/12 h-[300px] md:h-full rounded-lg bg-primary_ overflow-hidden z-10">
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
      src={slide.data.bannerURL}
      alt={slide.data.gameName}
      fill
      className="absolute inset-0 z-10 object-cover bg-gradient-to-r from-primary_ to-light_"
      priority
    />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-30">
        {slides && slides.map((_, idx) => (
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

export default Carousel;