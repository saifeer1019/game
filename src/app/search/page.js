'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import SearchBar from "@/components/widgets/SearchBar";
import Navbar from "@/components/Navbar";
import Filter from "@/components/widgets/Filter";
import Gallery from "@/components/Gallery";
import Footer from '@/components/Footer';
import Pagination from '@/components/widgets/Pagination';
import axios from 'axios';

export default function SearchPage() {
    const router = useRouter();
    const [query, setQuery] = useState('');
    const [games, setGames] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    // Filters state
    const [filters, setFilters] = useState({
        operatingSystem: '',
        releaseYear: '',
        rating: '',
        developer: '',
        category: ''
    });

    const [sortOrder, setSortOrder] = useState('');

    // Fetch query from URL
    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        setQuery(queryParams.get('query') || '');
    }, []);

    // Fetch games with filters, sort, and pagination
    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/search', {
                    params: {
                        query,
                        page: currentPage,
                        operatingSystem: filters.operatingSystem,
                        releaseYear: filters.releaseYear,
                        rating: filters.rating,
                        developer: filters.developer,
                        category: filters.category,
                        sortOrder
                    }
                });

                setGames(response.data.games);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error('Error fetching games:', error);
            }
        };

        fetchGames();
    }, [query, currentPage, filters, sortOrder]);

    // Handle pagination change
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="relative min-h-screen flex flex-col">
            <div className="absolute inset-0 bg-[rgb(17,17,17)]" style={{ zIndex: -5 }}></div>
            <Navbar />

            <div className="flex flex-col px-4 sm:px-8 mt-24">
                <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold">
                    Search Results for: {`${query}`}
                </h1>

                <div className="mt-4 w-full overflow-x-auto">
                    <Filter 
                        filters={filters} 
                        setFilters={setFilters} 
                        setSortOrder={setSortOrder} 
                        sortOrder={sortOrder} 
                    />
                </div>

                <div className="mt-4 w-full">
                    <Gallery games={games} />
                </div>

                <Pagination 
                    currentPage={currentPage} 
                    totalPages={totalPages} 
                    onPageChange={handlePageChange} 
                />

                <Footer />
            </div>
        </div>
    );
}
