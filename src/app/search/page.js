'use client';
import dynamic from 'next/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import SearchBar from "@/components/widgets/SearchBar";
import Navbar from "@/components/Navbar";
import Filter from "@/components/widgets/Filter";
import Gallery from "@/components/Gallery";
import Footer from '@/components/Footer';
import axios from 'axios';












const LottieAnimation = dynamic(() => import('@/components/LottieAnimation'), { ssr: false });
import bubblesAnimation from "../lottie.json";

export default function SearchPage() {
    const router = useRouter();


    const [searchParams, setSearchParams] = useState(null);
        // Fetch query from URL
        useEffect(() => {
            const queryParams = new URLSearchParams(window.location.search);
            setSearchParams(queryParams);
        }, []);
    
        // Sync search input with URL query parameter
    useEffect(() => {
        const queryParam = searchParams.get('query');
        if (queryParam) {
            setSearch(queryParam);
        }
    }, [searchParams]);

    // State management
    const [searchState, setSearchState] = useState({
        query: '',
        tag: '',
        developer: '',
        genre: '',
    });
    
    const [games, setGames] = useState([]);
    const [lastDocId, setLastDocId] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Filter state
    const [filters, setFilters] = useState({
        operatingSystems: '',
        releaseYear: '',
        ratings: '',
        developer: '',
        genre: '',
        tags: '',
    });
    
    const [sortOrder, setSortOrder] = useState('');

    // Update search state from URL parameters
    useEffect(() => {
        const query = searchParams.get('query') || '';
        const tag = searchParams.get('tag') || '';
        const developer = searchParams.get('developer') || '';
        const genre = searchParams.get('genre') || '';

        setSearchState({
            query,
            tag,
            developer,
            genre,
        });

        // Update filters based on URL parameters
        setFilters(prev => ({
            ...prev,
            tags: tag || prev.tags,
            developer: developer || prev.developer,
            genre: genre || prev.genre,
        }));
    }, [searchParams]);

    // Function to construct search parameters
    const constructSearchParams = (lastDocId = null) => {
        const { query, tag, developer, genre } = searchState;
        return {
            query,
          
            operatingSystem: filters.operatingSystems,
            releaseYear: filters.releaseYear,
            rating: filters.ratings,
            developer: filters.developer || developer, // Prioritize filter selection
            genre: filters.genre || genre, // Prioritize filter selection
            tags: filters.tags || tag, // Prioritize filter selection
            sortOrder,
            limit: 12,
            lastDocId,
        };
    };

    // Function to fetch games
    const fetchGames = async (lastDocId = null) => {
        try {
           !lastDocId && setLoading(true);
            const params = constructSearchParams(lastDocId);
            
            // Only proceed if we have at least one search criterion
            if (!params.query && !params.tag && !params.developer && !params.genre) {
                setGames([]);
                setLoading(false);
                return;
            }

            const response = await axios.get('http://localhost:3000/api/search', {
                params
            });

            const newGames = response.data.games;
            const newLastDocId = response.data.lastDocId;

            setGames(prevGames => lastDocId ? [...prevGames, ...newGames] : newGames);
            setLastDocId(newLastDocId);
            setHasMore(!!newLastDocId);
            setError(null);
        } catch (error) {
            console.error("Error:", error);
            setError(error.response);
        } finally {
            setLoading(false);
        }
    };

    // Fetch games when search parameters or filters change
    useEffect(() => {
        setGames([]); // Reset games when search parameters change
        setLastDocId(null); // Reset pagination
        fetchGames();
    }, [searchState, filters, sortOrder]);

    const handleLoadMore = () => {
        fetchGames(lastDocId);
    };

    // Handle new search
    const handleSearch = (newQuery) => {
        router.push(`/search?query=${encodeURIComponent(newQuery)}`);
    };

    return (
        <div className="relative min-h-screen flex flex-col">
            <div className="absolute inset-0 bg-[rgb(17,17,17)]" style={{ zIndex: -5 }}></div>
            <Navbar onSearch={handleSearch} />

            <div className="flex flex-col px-4 sm:px-8 mt-24 min-h-screen">
                <SearchHeader searchState={searchState} />

                <div className="mt-4 w-full overflow-x-auto">
                    <Filter 
                        filters={filters} 
                        setFilters={setFilters} 
                        setSortOrder={setSortOrder} 
                        sortOrder={sortOrder} 
                    />
                </div>
                {error && <div className="text-red-500">{error.message}</div>}  

                {loading && (
                    <div className="min-h-screen bg-primary_ text-light_ flex items-center justify-center">
                        <LottieAnimation animationData={bubblesAnimation} className="lottie-container" />
                    </div>
                )}

                <div className="mt-4 w-full">
                    <Gallery games={games} />
                </div>

                {!games || games.length === 0 && !loading && (
                    <div className="text-white text-2xl text-center mt-10">No games found</div>
                )
                }

                {hasMore && games.length > 0 && (
                    <button
                        onClick={handleLoadMore}
                        className="px-4 py-2 rounded-lg bg-accent_ text-light_ w-fit self-center my-10"
                    >
                        View More
                    </button>
                )}

                
                
                
            </div>
            <Footer />
        </div>
    );
}

// Helper component for the search header
const SearchHeader = ({ searchState }) => {
    const { query, tag, developer, genre } = searchState;
    
    if (query) return <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold">Search Results for: {query}</h1>;
    if (tag) return <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold">Search Results for Tag: {tag}</h1>;
    if (genre) return <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold">Search Results for Genre: {genre}</h1>;
    if (developer) return <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold">Search Results for Developer: {developer}</h1>;
    return null;
};