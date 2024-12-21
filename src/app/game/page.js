"use client"
import Banner from "@/components/gamePage/Banner";
import { dummyGames } from "@/components/DummyGames";
import Navbar from "@/components/Navbar";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Landscape from "@/components/widgets/Landscape";
import Image from "next/image";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


export default function GamePage() {
    const { id } = useParams();
    const [game, setGame] = useState(dummyGames[0]);
    const imageUrl = game.imageUrl;
    const [activeTab, setActiveTab] = useState('overview');

    // useEffect(() => {
    //     fetch(`/api/game/${id}`)
    //         .then(response => response.json())
    //         .then(data => setGame(data));
    // }, [id]);

        // ... existing code ...
        return (
            <div className="relative min-h-screen flex flex-col justify-start">
                {/* full page gradient overlay */}
                <div className="absolute inset-0 bg-[rgb(17,17,17)]" style={{ zIndex: -5 }}></div>
                <Navbar />
                {/* Additional Info Section */}
                <motion.div className="px-8 py-12 z-20"
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}>
                    <div className="mt-14 flex justify-between">


                    

                        {/* game card */}
                        <div className="justify-self-end flex flex-col w-[35vw] items-start shadow-lg bg-[#181816] rounded-lg p-4">
                            <div className="flex justify-center items-center mb-4">
                                <Landscape
                                    src={game.data?.bannerURL || game.imageUrl}
                                    alt={game.data?.gameName || 'banner'}
                                    width={600}
                                    height={200}
                                />
                            </div>
                            <h1 className="text-4xl text-primary-500 font-semibold text-white mb-4 font-roboto">{game.data?.gameName}</h1>  
                            
                            {/* Badges Section */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">{game.data?.genre[0]}</span>
                                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">{game.data?.releaseDate}</span>
                            </div>
    
                            <div className="flex text-white items-center gap-4 mb-4">
                                <span className="bg-white/20 px-3 py-1 rounded">
                                    {game.data?.version}
                                </span>
                                <span className="flex items-center gap-1">
                                    <span className="text-yellow-400">★</span>
                                    {game.data?.rating}
                                </span>
                                <span>{game.data?.language}</span>
                            </div>
    
                            <p className="text-gray-300 mb-6 line-clamp-3">
                                {game.data?.overview}
                            </p>
    
                           
                         
    
                            {/* Tags Section */}
                            <div className="mt -8">
                                <h2 className="text-2xl text-white font-bold mb-4">Tags</h2>
                                <div className="flex flex-wrap gap-2">
                                    {game.data?.tags?.map((tag, index) => (
                                        <span 
                                            key={index}
                                            className="bg-white/10 text-white px-3 py-1 rounded-full text-sm"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>



 {/* Game Info */}                   
<div className="flex flex-col gap-4 w-[60vw] shadow-lg bg-[#181816] rounded-lg p-4">




{/*}
<div className="flex text-white flex-wrap gap-2 mb-6">
       {game.data?.genre?.slice(0, 5).map((tag, index) => (
           <span 
               key={index}
               className="bg-white/10 px-3 py-1 rounded-full text-sm"
           >
               {tag}
           </span>
       ))}
   </div>

   */}
     {/* Tabs Navigation */}
     <div className="flex space-x-4  border-b-[1px] border-white/10">
     <button 
         className={`px-4 py-2 ${activeTab === 'overview' ? ' text-primary-500 text-lg border-b-[1px] border-primary-500 ' : 'text-white'}`}
         onClick={() => setActiveTab('overview')}
     >
         Overview
     </button>
     <button 
         className={`px-4 py-2 ${activeTab === 'links' ? ' text-primary-500 text-lg border-b-[1px] border-primary-500 ' : 'text-white'}`}
         onClick={() => setActiveTab('links')}
     >
         Links
     </button>
     <button 
         className={`px-4 py-2 ${activeTab === 'screenshots' ? ' text-primary-500 text-lg border-b-[1px] border-primary-500 ' : 'text-white'}`}
         onClick={() => setActiveTab('screenshots')}
     >
         Screenshots
     </button>
 </div>


<div className="flex flex-col gap-4 ">
 {/* Tabs Content */}
 {activeTab === 'overview' && (
    <div className="flex flex-col gap-4 bg-white/5 rounded-lg p-6 text-white  z-10  ">
  
      
     
        <h3 className="text-xl font-semibold ">Developer Information</h3>
        <div className="flex flex-wrap gap-3">
            {game.data?.developerLinks?.map((link, index) => (
                <a 
                    key={index}
                    href={link.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/10 px-4 py-2 rounded hover:bg-white/20 transition"
                >
                    {link.name}
                </a>
            ))}
        </div>
        <h3 className="text-xl font-semibold ">Operating Systems</h3>
        <div className="flex flex-wrap gap-3">
            {game.data?.operatingSystem?.map((os, index) => (
                <span 
                    key={index}
                    className="bg-white/10 px-4 py-2 rounded hover:bg-white/20 transition"
                >
                    {os}
                </span>
            ))}
        </div>

      

         <h3 className="text-xl font-semibold ">Last Update</h3>
        <div className="bg-white/10 px-4 py-2 rounded hover:bg-white/20 transition w-fit">
        {new Date(game.data?.lastUpdateDate).toLocaleDateString()}
        </div>

        
        <h3 className="text-xl font-semibold ">Languages</h3>
        <div className="bg-white/10 px-4 py-2 rounded hover:bg-white/20 transition w-fit">
        {game.data?.language}
        </div>
 
  </div>

 
 )}
</div>
{/* Developer Info */}







                  {/* Screenshots Gallery */}
   <div>
       <h2 className="text-2xl text-white font-bold mb-4">Screenshots</h2>
       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
           {game.data?.images?.slice(0, 8).map((image, index) => (
               <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
                   <Image
                       src={image.url}
                       alt={image.alt}
                       fill
                       className="object-cover hover:scale-110 transition duration-300"
                   />
               </div>
           ))}
       </div>
   </div>

   </div>








                    </div>
                </motion.div>
            </div>
        );
    }