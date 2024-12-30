import Image from 'next/image';
import{ useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { MessageCircle, View, Eye } from 'lucide-react';

const FeaturedContent = ({ slides }) => {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);

    const handleNext = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  return (
    <div className='flex flex-col md:relative md:overflow-hidden h-[75vh] gap-6 bg-primary_  w-full '>

    <AnimatePresence>
    {slides.map((featuredContent, index) => (
      index === currentSlide && (
    <motion.div
    key={index}
    initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: "0%" }}
              exit={{ opacity: 0, x: "-100%" }}
    transition={{ duration: 0.5 }}
    className='flex flex-col md:relative md:overflow-hidden h-[75vh] gap-6 bg-primary_  w-full'>
    
  
    <button
    className="hidden md:block absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/20 p-3 rounded-full text-white z-30"
    onClick={handlePrev}
  >
    &#8249;
  </button>
  <button
    className="hidden md:block absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/20 p-3 rounded-full text-white z-40"
    onClick={handleNext}
  >
  &#8250;
  </button>

      {/* Content Container */}

   
      <div className="w-full z-20 md:absolute md:bottom-4 md:left-10 z- md:w-1/2 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl md:text-4xl font-bold mb-4 text-light_">
            {featuredContent.title}
          </h1>
          <p className="text-sm md:text-base w-[80%] text-light_ mb-4 leading-relaxed">
            {featuredContent.description}
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
      
          {featuredContent.tags[0]}
          </button>

          <button className="text-xs self-end  px-4 py-1 bg-secondary_ text-light_ rounded flex items-center hover:bg-opacity-80 cursor-pointer" onClick={() => {
            router.push(`/game`);
          }}>
       
          {featuredContent.tags[1]}
          </button>
  { /*   <div className=' flex gap-x-2 self-end  h-fit '>
      <div className='rounded orbitron bg-yellow-700 text-sm h-fit px-3 py-1 text-white/80'>
      <p className=''> {featuredContent.tags[0]}</p>
      </div>

      <div className='rounded orbitron bg-rose-700 text-sm h-fit  px-3 py-1 text-white/80'>
      <p className=''> {featuredContent.tags[1]}</p>
      </div>

      </div>*/}
          </div>
        </div>
      </div>



           {/* Image Container */}
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
    background: 'linear-gradient(to bottom, rgba(17, 17, 17, 1) 0%, rgba(17, 17, 17, 0.8) 15%, rgba(17, 17, 17, 0.1) 30%, transparent 100%)'
  }}
/>

<div 
className="absolute inset-0 z-20"
style={{
  background: 'linear-gradient(to top, rgba(17, 17, 17, 1) 0%, rgba(17, 17, 17, 0.8) 5%, rgba(17, 17, 17, 0.1) 15%, transparent 100%)'
}}
/>
      <Image
        src={featuredContent.imageUrl}
        alt={featuredContent.title}
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

export default FeaturedContent;