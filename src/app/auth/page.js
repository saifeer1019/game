import React from 'react';

const MoviePageBackground = ({ movie }) => {
  return (
    <div className="relative min-h-screen">
      {/* Blurred Banner Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center filter blur-lg opacity-50" 
        style={{ 
          backgroundImage: `url(${'https://f.woowoowoowoo.net/resize/250x400/99/7f/997fdcdc8228bddd182c663a7e16f590/997fdcdc8228bddd182c663a7e16f590.jpg'})`,
          zIndex: -2 
        }}
      />

      {/* Gradient Blur Overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black/90" 
        style={{ zIndex: -1 }}
      />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Your movie page content goes here */}
        <h1 className="text-4xl font-bold text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</h1>
        {/* Add more movie details */}
      </div>
    </div>
  );
};

export default MoviePageBackground;