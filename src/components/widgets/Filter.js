"use client"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from 'react'
import SearchBar from "./SearchBar"



import axios from "axios"

export default function Filter({ filters, setFilters, setSortOrder, sortOrder, setLoading}) {

    const operatingSystems = ['Windows', 'Linux', 'Mac', 'Android']
    const ratings = [ '3', '4', '5']
    const genres = ['Action', 'Adventure', 'Puzzle', 'RPG', 'Shooter', 'Strategy']  // List of genres
    const tags = ['Multiplayer', 'Single-player', 'Co-op', 'Open-World', 'VR']  // List of tags
    const [categories, setCategories] = useState({
        tags: [
          { id: 1, name: 'Action' },
          { id: 2, name: 'Adventure' },
        ],
        developers: [
          { id: 1, name: 'Naughty Dog' },
          { id: 2, name: 'Rockstar Games' }
        ],
        genres: [
          { id: 1, name: 'FPS' },
          { id: 2, name: 'RPG' }
        ]
      }); const handleFilterChange = (filterType, value) => {
        
        setFilters(prev => ({
            ...prev,
            [filterType]: value
        }))
        console.log(`filters` + filters.ratings)
    }

     useEffect(() => {
        const fetchCategories = async () => {
          try {
            const response = await fetch('/api/categories');
            const data = await response.json();
            setCategories(data);
          } catch (error) {
            console.error('Error fetching categories:', error);
          }
        };
    
        fetchCategories();
        console.log(categories)
      }, []);
    

    return (
        <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row md:flex-wrap md:gap-6 w-full py-4">
            {/* Operating System Filter */}
            <div className="min-w-[200px]">
                
                <Label className="text-white mb-2 block">Operating System</Label>
                <select 
                    value={filters.operatingSystems} 
                    onChange={(e) => handleFilterChange('operatingSystems', e.target.value)} 
                    className="w-full px-3 py-1 rounded bg-white/10 text-white text-sm"
                >
                <option className="bg-white/10 text-black" value="">Select OS</option>
                    {operatingSystems.map(genre => (
                        <option key={genre} value={genre} className="bg-white/10 text-black">
                            {genre}
                        </option>
                    ))}
                </select>
            </div>

            {/* Genre Filter - Dropdown */}
            <div className="min-w-[200px]">
                <Label className="text-white mb-2 block">Genre</Label>
                <select 
                    value={filters.genre} 
                    onChange={(e) => handleFilterChange('genre', e.target.value)} 
                    className="w-full px-3 py-1 rounded bg-white/10 text-white text-sm"
                >
                <option className="bg-white/10 text-black" value="">Select Genre</option>
                {categories && categories.genres.map(genre => (
                    <option key={genre.id} value={genre.name} className="bg-white/10 text-black">
                        {genre.name}
                    </option>))
                }
                 
                </select>
            </div>

            {/* Tags Filter - Dropdown */}
            <div className="min-w-[200px]">
                <Label className="text-white mb-2 block">Tags</Label>
                <select 
                    value={filters.tags} 
                    onChange={(e) => handleFilterChange('tags', e.target.value)} 
                    className="w-full px-3 py-1 rounded bg-white/10 text-white text-sm"
                >
                    <option className="bg-white/10 text-black" value="">Select Tag</option>
                    {categories && categories.tags.map(tag => (
                        <option key={tag.id} value={tag.name} className="bg-white/10 text-black">
                            {tag.name}
                        </option>))
                    }
                </select>
            </div>

            {/* Rating Filter */}
            <div className="min-w-[120px]">
                <Label className="text-white mb-2 block">Rating</Label>
                <select 
                    value={ratings} 
                    onChange={(e) => handleFilterChange('ratings', e.target.value)} 
                    className="w-full px-3 py-1 rounded bg-white/10 text-white text-sm"
                >
                    <option className="bg-white/10 text-black" value="">Select</option>
                    {ratings.map(rating => (
                        <option key={rating} className="bg-white/10 text-black" value={rating}>
                            ⭐ {rating} and up
                        </option>
                    ))}
                </select>
            </div>

            {/* Sort Order Filter */}
            <div className="min-w-[120px]">
                <Label className="text-white mb-2 block">Sort By</Label>
                <select 
                    value={sortOrder} 
                    onChange={(e) => setSortOrder(e.target.value)} 
                    className="w-full px-3 py-1 rounded bg-white/10 text-white text-sm"
                >
                    <option className="bg-white/10 text-black" value="">Select</option>
                    <option className="bg-white/10 text-black" value="rating">Rating</option>
                 
                    <option className="bg-white/10 text-black" value="recentlyAdded">Recently Added</option>
                    <option className="bg-white/10 text-black" value="alphabetical">A - Z</option>
                    <option className="bg-white/10 text-black" value="views">Most Watched</option>
                </select>
            </div>

          
        </div>
    );
}
