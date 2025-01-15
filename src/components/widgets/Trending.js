import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Link } from "lucide-react";
import { dummyGames } from "../DummyGames";
import { useRouter } from "next/navigation";

export default function Trending({games}) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(4); // Number of cards visible at a time
  const scrollStep = 2; // Number of cards to scroll at a time

  useEffect(() => {
    const updateCardsToShow = () => {
      if (window.innerWidth >= 1024) setCardsToShow(4);
      else if (window.innerWidth >= 768) setCardsToShow(3);
      else setCardsToShow(1);
    };

    updateCardsToShow();
    window.addEventListener("resize", updateCardsToShow);

    return () => window.removeEventListener("resize", updateCardsToShow);
  }, []);

  const maxIndex = Math.ceil(dummyGames.length / scrollStep) - Math.ceil(cardsToShow / scrollStep);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : prev));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  return (
    <div className="w-full relative px-4 sm:px-8 my-[10vh] flex flex-col">
      <h1 className="text-xl sm:text-2xl text-white/80 font-semibold mb-4">Trending</h1>

      <div className="overflow-hidden relative">
        <motion.div
          className="flex gap-8"
          initial={false}
          animate={{ x: `-${(currentIndex * 100) / cardsToShow}%` }}
          transition={{ duration: 0.5 }}
        >
          {games && games.map((game, index) => (
            <motion.div
              key={index}
              className="cursor-pointer w-[calc(100%/4)] md:w-[calc(100%/3)] sm:w-[calc(100%/2)] "
              whileHover={{ scale: 1.02 }}
              onClick={() => router.push(`/game/${game.id}`)}
            >
            
              <div className="bg-secondary_ rounded-lg overflow-hidden shadow-lg">
                <div className="relative aspect-[3/4] sm:h-[35vh]">
                  <Image
                    src={game.data.bannerURL}
                    alt={game.data.gameName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="mt-2 flex justify-start items-center gap-2">
                  <h1 className="text-accent_ text-lg font-extrabold">
                    {index < 9 ? "0" : null}
                    {index + 1}
                  </h1>
                  <h1
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                    className="text-light_ text-lg font-semibold"
                  >
                    {game.data.gameName}
                  </h1>
                </div>
              </div>
             
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Navigation Buttons */}
      <button
        className={`absolute left-2 top-1/2 -translate-y-1/2 bg-accent_ hover:bg-hover_ p-2 rounded-full ${
          currentIndex === 0 ? "hidden" : "block"
        }`}
        onClick={handlePrev}
      >
        <ChevronLeft className="text-light_ w-6 h-6" />
      </button>
      <button
        className={`absolute right-2 top-1/2 -translate-y-1/2 bg-accent_ hover:bg-hover_ p-2 rounded-full ${
          currentIndex === maxIndex ? "hidden" : "block"
        }`}
        onClick={handleNext}
      >
        <ChevronRight className="text-light_ w-6 h-6" />
      </button>
    </div>
  );
}
