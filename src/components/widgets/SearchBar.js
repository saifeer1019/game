'use client';
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

export default function SearchBar({ onSearch }) {
    const searchParams = useSearchParams();
    const [search, setSearch] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const router = useRouter();

    // Sync search input with URL query parameter
    useEffect(() => {
        const queryParam = searchParams.get('query');
        if (queryParam) {
            setSearch(queryParam);
        }
    }, [searchParams]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (search.trim()) {
            if (onSearch) {
                onSearch(search.trim());
            } else {
                router.push(`/search?query=${encodeURIComponent(search.trim())}`);
            }
        }
    };

    return (
        <form 
            onSubmit={handleSubmit}
            className="relative w-[300px]"
        >
            <div className={`flex items-center transition-all duration-200 bg-secondary_ rounded-[20px] overflow-hidden ${
                isFocused ? 'ring-2 ring-accent_' : 'ring-1 ring-muted_/30'
            }`}>
                <input
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className="w-full bg-transparent text-light_ placeholder-muted_ text-sm py-2 px-4 outline-none"
                    placeholder="Search games..."
                />
                <button 
                    type="submit"
                    className="p-2 text-muted_ hover:text-accent_ transition-colors"
                    aria-label="Search"
                >
                    <Search className="w-5 h-5" />
                </button>
            </div>
        </form>
    );
}