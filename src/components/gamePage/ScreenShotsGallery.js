import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const ScreenshotGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleImageClick = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  const navigateImages = (direction) => {
    const newIndex = direction === 'next' 
      ? (currentIndex + 1) % images.slice(0, 8).length
      : (currentIndex - 1 + images.slice(0, 8).length) % images.slice(0, 8).length;
    setSelectedImage(images.slice(0, 8)[newIndex]);
    setCurrentIndex(newIndex);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Screenshots</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.slice(0, 8).map((image, index) => (
          <motion.div 
            key={image.id} 
            className="relative aspect-video rounded-lg overflow-hidden cursor-pointer"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => handleImageClick(image, index)}
          >
            <Image
              src={image.url}
              alt={image.alt}
              layout="fill"
              objectFit="cover"
            />
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          >
            <motion.div
              className="relative max-w-[90vw] max-h-[90vh] w-auto h-auto"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 20 
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.5}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = offset.x;
                if (Math.abs(swipe) > 100 || Math.abs(velocity.x) > 500) {
                  navigateImages(swipe > 0 ? 'prev' : 'next');
                }
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                className="absolute -top-10 right-0 text-white"
                onClick={handleClose}
                whileHover={{ scale: 1.1 }}
              >
                <X size={24} />
              </motion.button>

              <motion.button
                className="absolute left-2 top-1/2 -translate-y-1/2 text-white bg-black/50 rounded-full p-1"
                onClick={() => navigateImages('prev')}
                whileHover={{ scale: 1.1 }}
              >
                <ChevronLeft size={24} />
              </motion.button>

              <motion.button
                className="absolute right-2 top-1/2 -translate-y-1/2 text-white bg-black/50 rounded-full p-1"
                onClick={() => navigateImages('next')}
                whileHover={{ scale: 1.1 }}
              >
                <ChevronRight size={24} />
              </motion.button>

              <Image
                src={selectedImage.url}
                alt={selectedImage.alt}
                width={1200}
                height={800}
                objectFit="contain"
                className="rounded-lg"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ScreenshotGallery;