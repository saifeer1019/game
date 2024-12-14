import Image from "next/image";
import Landscape from "../widgets/Landscape";
import { Play } from "lucide-react";
import { motion } from 'framer-motion';

export default function Banner({ game }) {
    return (
     
        <div 
        
         className="relative min-h-[600px] max-w-7xl mx-auto flex items-center rounded-lg">
            {/* Main banner image */}
            <motion.div className="absolute inset-0 rounded-xl mt-24"
            initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}>
                <Landscape 
                    src={game.data?.bannerURL || game.imageUrl} 
                    alt={game.data?.gameName || 'banner'} 
                    height="100%"
                    objectPosition="center"
                />
                {/* Gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent rounded-lg" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent rounded-lg" />
            </motion.div>
        
        
        {/* Play section moved outside of motion.div */}
        <div className="relative z-20 w-full px-8 flex items-center justify-center">
            <div className="max-w-3xl">
                <div className="flex gap-4">
                    <button className="flex items-center bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-white/90 transition">
                        <Play className="w-5 h-5 mr-2" color="#a20101" fill="#a20101" />
                        Play Now
                    </button>
                    {/* <button className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-white/90 transition">
                        More Info
                    </button> */}
                </div>
            </div>
        </div>
        </div>
   
    );
}