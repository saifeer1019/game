import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const CarouselMobile = ({ slides }) => {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef(null);
  const autoSlideRef = useRef(null);
  const hammerRef = useRef(null);

  // Start auto-slide
  const startAutoSlide = () => {
    if (autoSlideRef.current) clearInterval(autoSlideRef.current);
    autoSlideRef.current = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 10000);
  };

  // Initialize Hammer.js for swipe gestures
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    // Dynamically import Hammer.js
    import("hammerjs").then(({ default: Hammer }) => {
      const hammer = new Hammer(carousel, {
        recognizers: [
          [Hammer.Swipe, { direction: Hammer.DIRECTION_HORIZONTAL }],
        ],
      });

      hammerRef.current = hammer;

      // Handle swipe left (next slide)
      hammer.on("swipeleft", () => {
        setCurrentSlide(prev => (prev + 1) % slides.length);
      });

      // Handle swipe right (previous slide)
      hammer.on("swiperight", () => {
        setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
      });
    });

    // Cleanup Hammer.js on unmount
    return () => {
      if (hammerRef.current) hammerRef.current.destroy();
    };
  }, [slides.length]);

  // Start auto-slide on mount and cleanup on unmount
  useEffect(() => {
    startAutoSlide();
    return () => {
      if (autoSlideRef.current) clearInterval(autoSlideRef.current);
    };
  }, [slides]);

  // Update carousel transform on slide change
  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
  }, [currentSlide]);

  return (
    <div className="relative h-[50vh] mt-14 w-full overflow-hidden">
      {/* Carousel Slides */}
      <div 
        ref={carouselRef}
        className="flex w-full h-full transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides && slides.map((slide, index) => (
          <div key={index} className="min-w-full h-full relative">
            {/* Slide Content */}
            <div className="z-40 absolute bottom-0 left-0 mx-2 w-[50vw] flex flex-col justify-between">
              <div>
                <h1 className="text-2xl font-bold mb-2 ml-1 text-light_">
                  {slide.data.gameName}
                </h1>
              </div>
              
              <div className="space-y-4 mb-10">
                <button 
                  className="w-fit rounded-full py-2 px-4 bg-accent_ text-primary_ 
                             flex items-center justify-center gap-1 text-sm hover:bg-hover_ transition-colors"
                  onClick={() => router.push('/game/' + slide.id)}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Game Details
                </button>
              </div>
            </div>

            {/* Image with Gradient Overlays */}
            <div className="absolute w-full h-full">
              <div 
                className="absolute inset-0 z-20"
                style={{
                  background: 'linear-gradient(to right, rgba(17, 17, 17, 1) 0%, rgba(17, 17, 17, 0.8) 5%, rgba(17, 17, 17, 0.1) 30%, transparent 100%)'
                }}
              />
              <div 
                className="absolute inset-0 z-20"
                style={{
                  background: 'linear-gradient(to left, rgba(17, 17, 17, 1) 0%, rgba(17, 17, 17,0.8) 5%, rgba(36, 36, 40, 0.1) 40%, transparent 100%)'
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
                  background: 'linear-gradient(to top, rgba(17, 17, 17, 1) 0%, rgba(17, 17, 17, 0.8) 5%, rgba(17, 17, 17, 0.1) 40%, transparent 100%)'
                }}
              />
              <Image
                src={slide.data.bannerURL}
                alt={slide.data.gameName}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
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