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
    const [lastDocId, setLastDocId] = useState(null);  // To store the last document for pagination

    const [hasMore, setHasMore] = useState(true);  // To check if there are more games to fetch
    const [loading, setLoading] = useState(false);  // To manage loading state
    const [error, setError] = useState(null);

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

    // Function to fetch games
    const fetchGames = async (lastDocId = null) => {
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
                    sortOrder,
                    limit: 5,
                    lastDocId: lastDocId,
                }
            });

            // Handle the response data
            const newGames = response.data.games;
            const newLastDocId = response.data.lastDocId;

            // Update state with new games and lastDocId
            setGames(newGames);
            setLastDocId(newLastDocId);

            // If no nextDocId, set hasMore to false
            setHasMore(!!newLastDocId);

            setLoading(false);
        } catch (error) {
            console.error("Error:", error);
            setError(error);
            setLoading(false);
        }
    };

    // Fetch games on mount and when dependencies change
    useEffect(() => {
        fetchGames();
    }, [query, currentPage, filters, sortOrder]);

    const handleLoadMore = () => {
        fetchGames(lastDocId);  // Fetch next set of games
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

                    <button
                        onClick={handleLoadMore}
                        className="px-4 py-2 rounded-lg bg-accent_ text-light_ w-fit self-center my-10 justify-self-end"
                    >
                        View More
                    </button>
                
                <Footer />
            </div>

            {error && <div className="text-red-500">{error.message}</div>}
        </div>
    );
}
