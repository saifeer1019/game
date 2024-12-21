import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { MessageCircle, View, Eye } from 'lucide-react';

const FeaturedContent = ({ featuredContent }) => {
  const router = useRouter();
  
  return (
    <div className='flex flex-col md:flex-row  md:items-end gap-6 bg-zinc-900/50 mt-8 rounded-xl p-4 md:p-8 w-full'>
      {/* Image Container */}
      <div className="relative w-full md:w-1/2 h-[300px] md:h-[400px] rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 z-10" />
        <Image
          src={featuredContent.imageUrl}
          alt={featuredContent.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content Container */}
      <div className="w-full md:w-1/2 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl md:text-4xl font-bold mb-4 text-white/90">
            {featuredContent.title}
          </h1>
          <p className="text-sm md:text-base text-gray-300 mb-4 leading-relaxed">
            {featuredContent.description}
          </p>
        </div>

        <div className="space-y-4">
          {/* Main Button */}
          <button 
            className="w-full rounded md:w-auto px-6 py-3 bg-cyan-500 text-white/90  
                     flex items-center justify-center gap-2 hover:bg-cyan-600 transition-colors"
            onClick={() => router.push('/game')}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            Game Details
          </button>

          {/* Tags Container */}
          <div className="flex flex-wrap gap-2">
       <button className="text-xs self-end  px-4 py-1 bg-red-800 text-white/80 rounded flex items-center hover:bg-opacity-80 cursor-pointer" onClick={() => {
            router.push(`/game`);
          }}>
      
          {featuredContent.tags[0]}
          </button>

          <button className="text-xs self-end  px-4 py-1 bg-red-800 text-white/80 rounded flex items-center hover:bg-opacity-80 cursor-pointer" onClick={() => {
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
    </div>
  );
};

export default FeaturedContent;