// SearchPage.jsx
'use client';

import { useRouter } from 'next/navigation';
import SearchBar from "@/components/widgets/SearchBar";
import Navbar from "@/components/Navbar";
import Filter from "@/components/widgets/Filter";
import Gallery from "@/components/widgets/PaginatedGallery";
import Footer from '@/components/Footer';

export default function SearchPage() {
    const router = useRouter();
    const { query } = router;

    return (
        <div className="relative min-h-screen flex flex-col">
            <div className="absolute inset-0 bg-[rgb(17,17,17)]" style={{ zIndex: -5 }}></div>
            <Navbar />

            <div className="flex flex-col px-4 sm:px-8 mt-24">
                <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold">
                    Search Results for: {`${query}`}
                </h1>
                
                <div className="mt-4 w-full overflow-x-auto">
                    <Filter />
                </div>
                
                <div className="mt-4 w-full">
                    <Gallery />
                </div>
                <Footer />
            </div>
        </div>
    );
}