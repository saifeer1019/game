import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';

const Landscape = ({ 
  src, 
  alt, 
  width = '100%', 
  height = '300px', 
  objectPosition = 'top' 
}) => {
  return (
<div
      className="relative overflow-hidden" 
      style={{ 
        width: typeof width === 'number' ? `${width}px` : width, 
        height: typeof height === 'number' ? `${height}px` : height,
        borderRadius: '2px',
      }}
     
    >
    
        <Image 
          src={src}
          alt={alt}
          fill
          style={{
            objectFit: 'cover',
            objectPosition: objectPosition, // Allows custom focus
            borderRadius: '2px',
          }}
          priority={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
  
  );
};

export default Landscape;


