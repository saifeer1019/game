
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const FeaturedContent = ({ featuredContent }) => {
  const router = useRouter();
  return (
    <div className="relative h-[70vh] w-full">
        <div className="absolute inset-0 bg-transparent/10 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/80 z-10" />
        <Image
          src={featuredContent.imageUrl}
          alt={featuredContent.title}
          layout="fill"
          object="cover"
          className="object-cover"
          priority
        />
        <div className="absolute bottom-0 left-0 p-12 z-20 w-full md:w-1/2">
          <h1 className="text-5xl font-bold mb-4">{featuredContent.title}</h1>
          <p className="text-lg mb-4">{featuredContent.description}</p>
          <div className="flex space-x-4">
            <button className="px-8 py-2 bg-white text-black rounded flex items-center hover:bg-opacity-80 cursor-pointer" onClick={() => {
              router.push(`/game`);
            }}>
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              Play
            </button>
            <button className="px-8 py-2 bg-gray-500 bg-opacity-50 text-white rounded flex items-center hover:bg-opacity-40 cursor-pointer">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              More Info
            </button>
          </div>
        </div>
      </div>
  );
};

export default FeaturedContent;