'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function ContentRow({ title, items = [] }) {
  const [isHovered, setIsHovered] = useState(null);

  return (
    <div className="px-12 mb-8">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex-none w-48 h-28 relative group"
            onMouseEnter={() => setIsHovered(index)}
            onMouseLeave={() => setIsHovered(null)}
          >
            <div className={`transform transition-transform duration-300 ${isHovered === index ? 'scale-110 z-10' : ''}`}>
              <Image
                src={item.imageUrl || `/thumbnail-${index + 1}.jpg`}
                alt={item.title || 'Content thumbnail'}
                fill
                className="rounded object-cover"
              />
              {isHovered === index && (
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded flex items-center justify-center space-x-2">
                  <button className="p-2 bg-white rounded-full hover:bg-gray-200">
                    <svg className="w-4 h-4" fill="black" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                  <button className="p-2 border-2 border-white rounded-full hover:border-gray-300">
                    <svg className="w-4 h-4" fill="none" stroke="white" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 