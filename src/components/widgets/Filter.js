// Filter.jsx
"use client"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useState } from 'react'
import SearchBar from "./SearchBar"

export default function Filter({ filters, setFilters, setSortOrder, sortOrder}) {

    const operatingSystems = ['Windows', 'Linux', 'Mac', 'Android']
    const ratings = ['1', '2', '3', '4', '5']
    const categories = ['Adult Games', 'Visual Novel', 'RPG', 'Adventure']

    const handleFilterChange = (filterType, value) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: value
        }))
    }

    return (
        <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row md:flex-wrap md:gap-6 w-full py-4">
            {/* Operating System Filter */}
            <div className="min-w-[200px]">
                <Label className="text-white mb-2 block">Operating System</Label>
                <div className="flex flex-wrap gap-2">
                    {operatingSystems.map(os => (
                        <button
                            key={os}
                            onClick={() => handleFilterChange('operatingSystem', os)}
                            className={`px-3 py-1 rounded text-sm ${
                                filters.operatingSystem === os 
                                    ? 'bg-white text-black' 
                                    : 'bg-white/10 text-white'
                            }`}
                        >
                            {os}
                        </button>
                    ))}
                </div>
            </div>

            {/* Category Filter */}
            <div className="min-w-[200px]">
                <Label className="text-white mb-2 block">Category</Label>
                <div className="flex flex-wrap gap-2">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => handleFilterChange('category', category)}
                            className={`px-3 py-1 rounded text-sm ${
                                filters.category === category 
                                    ? 'bg-white text-black' 
                                    : 'bg-white/10 text-white'
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Rating Filter */}
            <div className="min-w-[120px]">
                <Label className="text-white mb-2 block">Rating</Label>
                <select 
                    value={sortOrder} 
                    onChange={(e) => setSortOrder(e.target.value)} 
                    className="w-full px-3 py-1 rounded bg-white/10 text-white text-sm"
                >
                    <option className="bg-white/10 text-black" value="">Select</option>
                    {ratings.map(rating => (
                        <option key={rating} className="bg-white/10 text-black" value={rating}>
                            {rating} ⭐
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
                    <option className="bg-white/10 text-black" value="rating">Rating ⭐</option>
                    <option className="bg-white/10 text-black" value="releaseYear">Release Year 📅</option>
                </select>
            </div>

            {/* Apply/Clear Filters Button */}
            <div className="flex items-end">
                <button
                    onClick={() => setFilters({
                        operatingSystem: '',
                        releaseYear: '',
                        rating: '',
                        developer: '',
                        category: ''
                    })}
                    className="px-4 py-1 rounded bg-accent_ text-light_ hover:bg-hover_ text-sm"
                >
                    Apply Filters
                </button>
            </div>
        </div>
    );
}