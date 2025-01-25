import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Carousel = ({ slides }) => {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef(null);
  const autoSlideRef = useRef(null);
  const hammerRef = useRef(null); // Ref to store Hammer instance

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
        touchAction: 'pan-y', // Allow vertical scrolling
        inputClass: Hammer.TouchInput, // Use touch input only
      });

      // Store Hammer instance in ref
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
      if (hammerRef.current) hammerRef.current.destroy(); // Use the ref to access Hammer instance
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

  // Handle next slide
  const handleNext = () => {
    setCurrentSlide(prev => (prev + 1) % slides.length);
  };

  // Handle previous slide
  const handlePrev = () => {
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative h-[75vh] sm:mt-0 w-full bg-primary_ flex items-center justify-center overflow-hidden">
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

      {/* Carousel Slides */}
      <div 
        ref={carouselRef}
        className="flex transition-transform duration-500 ease-out w-full h-full"
        style={{ 
          transform: `translateX(-${currentSlide * 100}%)`,
          touchAction: "pan-y", // Ensure touch events are not blocked
        }}
      >
        {slides && slides.map((slide, index) => (
          <div 
            key={index} 
            className="w-screen shrink-0 relative h-full bg-primary_"
            style={{ width: '100vw' }} // Ensure each slide has the correct width
          >
            {/* Slide Content */}
            <div className="w-full z-20 md:absolute md:bottom-4 md:left-10 md:w-1/2 flex flex-col justify-between">
              <div>
                <h1 className="text-2xl md:text-6xl font-bold mb-4 text-light_">
                  {slide.data.gameName}
                </h1>
                <div className="flex flex-wrap gap-2 my-4">
                  <button className="text-xs self-end px-4 py-1 bg-secondary_ text-light_ rounded flex items-center hover:bg-opacity-80 cursor-pointer">
                    {slide.data.genre[0]}
                  </button>
                  <button className="text-xs self-end px-4 py-1 bg-secondary_ text-light_ rounded flex items-center hover:bg-opacity-80 cursor-pointer">
                    {slide.data.genre[1]}
                  </button>
                </div>
                <p className="Bebas_Neue text-sm md:text-base w-[80%] text-neutral-300 mb-4 leading-relaxed">
                  {slide.data.overview.slice(0, 300)}
                </p>
              </div>
              <div className="space-y-4">
                <button 
                  className="w-full font-semibold rounded-[20px] md:w-auto px-3 mt-4 py-2 bg-accent_ text-light_ flex items-center justify-center gap-1 hover:bg-hover_ transition-colors"
                  onClick={() => router.push('/game/' + slide.id)}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Game Details
                </button>
              </div>
            </div>

            {/* Image with Gradient Overlays */}
            <div className="absolute right-0 w-full md:w-[70%] h-[300px] md:h-full rounded-lg bg-primary_ overflow-hidden z-10">
              {/* Gradient Overlays */}
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
          </div>
        ))}
      </div>

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