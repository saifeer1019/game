// Landscape.js
"use client"
import Image from 'next/image';

const Landscape = ({ 
  src, 
  alt, 
  width = '100%', 
  height = '300px', 
  objectPosition = 'top' 
}) => {
  return (
    <div
      className="relative overflow-hidden w-full" 
      style={{ 
        height: typeof height === 'number' ? `${height}px` : height,
        borderRadius: '8px',
      }}
    >
      <Image 
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-300 hover:scale-105"
        style={{
          objectPosition: objectPosition,
          borderRadius: '8px',
        }}
        priority={true}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
    </div>
  );
};

export default Landscape;