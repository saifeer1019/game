"use client";
import Image from 'next/image';
import { useState, useEffect } from 'react';
import axios from 'axios';
import PortraitImageCrop from './widgets/Portrait';
import { dummyGames } from './DummyGames';
import { Link, Eye, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Gallery({slice = 8, heading, games}) {


 

  return (
    <div className="w-full  sm:px-6 md:px-8 md:mb-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4  md:gap-6">
        {games && games.map((game, index) => (
          <motion.div
            key={index}
            onClick={() => window.location.href = `/game/${game.slug}`}
            className="flex flex-col items-center w-full cursor-pointer"
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.2 },
            }}
          >
            <div className="relative w-full aspect-[4/2]">
              <PortraitImageCrop
                src={game.data.bannerURL}
                alt={game.data.gameName}
                width="100%"
                height="100%"
              />
              <div className="absolute bottom-[0] flex flex-wrap m-2 items-center w-[90%] justify-start gap-2 z-20">
                {game.data.prefix.map((prefix, index) => (
                  <p
                    key={index}
                    className="bg-[#d92365] text-light_ shadow-xl shadow-secondary_ roboto-condensed text-xs sm:text-xs font-semibold px-2 pb-[2px] rounded"
                  >
                    {prefix}
                  </p>
                ))}
                <p className="text-light_ roboto-condensed shadow-xl shadow-secondary_ font-semibold bg-[#d92365] px-2 pb-[2px] text-xs sm:text-xs rounded">
                  {game.data.version}
                </p>
              </div>
            </div>

            <div className="flex flex-col w-full bg-primary_ shadow-sm p-2">
              <h2 className="bebas text-light_ text-lg sm:text-lg font-bold tracking-wide mt-1 truncate">
                {game.data.gameName}
              </h2>

              <div className="flex flex-row text-xs sm:text-xs justify-between gap-x-4 w-full">
                <div className="flex flex-row gap-x-4 text-muted_">
                  <div className="flex flex-row items-center">
                    <Eye className="w-3 h-3 mr-[2px]" />
                    <p className="orbitron">{game.data.ratingCount} Views</p>
                  </div>

                  <div className="flex flex-row items-center">
                    <Link className="w-3 h-3 mr-[2px]" />
                    <p className="orbitron">{game.data.developerLinks.length} Links</p>
                  </div>

                  <div className="flex flex-row items-center text-accent-300">
                    <Star className="w-3 h-3 mr-[2px]" />
                    <p className="orbitron">{Number(game.data.rating).toFixed(1)}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
