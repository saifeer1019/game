'use client';

import { useRouter } from 'next/router';
import SearchBar from "@/components/widgets/SearchBar";
import Navbar from "@/components/Navbar";
import Filter from "@/components/widgets/Filter";
import Gallery from "@/components/Gallery";

export default function SearchPage() {
    const router = useRouter();
    const { query } = router; // Extract query from the router object

    return (
        <div className="relative min-h-screen flex flex-col justify-start ">
        {/* full page gradient overlay */}
        <div className="absolute inset-0 bg-[rgb(17,17,17)]" style={{ zIndex: -5 }}></div>
        <Navbar />

<div className="flex flex-col items-center justify-center mt-14">


         <h1 className="text-white text-4xl font-bold mt-10 self-start mx-8"> Search Results for: {`${query}`}</h1>
         <div className="mt-4 mx-8 ">
            <Filter />
            </div>
            <div className="mt-4 w-full ">
            <Gallery />
            </div>

    
        </div>
        </div>
    );
}