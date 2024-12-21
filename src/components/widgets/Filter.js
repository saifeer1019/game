"use client"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useState } from 'react'
import SearchBar from "./SearchBar"

export default function Filter() {
    const [filters, setFilters] = useState({
        operatingSystem: '',
        releaseYear: '',
        rating: '',
        developer: '',
        category: ''
    })

    const [sortOrder, setSortOrder] = useState('')

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
        <div className="py-4 flex justify-start  gap-x-4 items-center rounded-lg mt-4 w-full">
       
            
            {/* Operating System Filter */}
            <div className="flex justify-around items-center gap-x-8">
          
            <div className="">
                <Label className="text-white mb-2 block">Operating System</Label>
                <div className="flex flex-wrap gap-2">
                    {operatingSystems.map(os => (
                        <button
                            key={os}
                            onClick={() => handleFilterChange('operatingSystem', os)}
                            className={`px-3 py-1 rounded ${
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

            {/* Rating Filter */}
            <div className="">
                <Label className="text-white mb-2 block">Minimum Rating</Label>
                <div className="flex gap-2">
                    {ratings.map(rating => (
                        <button
                            key={rating}
                            onClick={() => handleFilterChange('rating', rating)}
                            className={`px-3 py-1 rounded ${
                                filters.rating === rating 
                                    ? 'bg-white text-black' 
                                    : 'bg-white/10 text-white'
                            }`}
                        >
                            {rating}★
                        </button>
                    ))}
                </div>
            </div>

            {/* Category Filter */}
            <div className="">
                <Label className="text-white mb-2 block">Category</Label>
                <div className="flex flex-wrap gap-2">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => handleFilterChange('category', category)}
                            className={`px-3 py-1 rounded ${
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

            {/* Sort Order Filter */}
            <div className="">
                <Label className="text-white mb-2 block">Sort By</Label>
                <select 
                    value={sortOrder} 
                    onChange={(e) => setSortOrder(e.target.value)} 
                    className="px-3 py-1 rounded bg-white/10 text-white"
                >
                    <option className="bg-white/10 text-black " value="">Select</option>
                    <option className="bg-white/10 text-black" value="rating">Rating ⭐</option>
                    <option className="bg-white/10 text-black" value="releaseYear">Release Year 📅</option>
                </select>
            </div>
            
           

            {/* Clear Filters Button */}
    
            </div>

            <button
            onClick={() => setFilters({
                operatingSystem: '',
                releaseYear: '',
                rating: '',
                developer: '',
                category: ''
            })}
            className=" px-3 py-1 rounded  bg-red-600 text-white   hover:bg-red-700 self-end"
        >
            Clear Filters
        </button>
        </div>
    )
}