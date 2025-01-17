import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const CarouselMobile = ({slides}) => {
  const router = useRouter();
  

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 10000);

    return () => clearInterval(timer);
  }, [slides]);

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
        {slides && slides.map((slide, index) => (
          <div key={index} className="min-w-full h-full relative">
            <div className="z-20 absolute bottom-0 left-0 mx-2 w-[50vw] flex flex-col justify-between">
              <div>
                <h1 className="text-2xl font-bold mb-2 text-light_">
                {slide.data.gameName}
                </h1>
              </div>
              
              <div className="space-y-4 my-2">
                <button 
                  className="w-fit rounded-full py-2 px-4 bg-accent_ text-primary_ 
                           flex items-center justify-center gap-1 text-sm hover:bg-hover_ transition-colors"
                  onClick={() => router.push('/game' + slide.id)}
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
                src={slide.data.bannerURL}
                alt={slide.data.gameNme}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        ))}
      </motion.div>

      <div className="absolute top-1/2 right-2 flex flex-col gap-2 z-30">
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

export default CarouselMobile;