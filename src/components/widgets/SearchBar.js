"use client"
import { useState } from "react";
import {useRouter} from "next/navigation";

export default function SearchBar() {
    const [search, setSearch] = useState('');
    const router = useRouter()

    const handleSubmit = (e) => {
        e.preventDefault();
        router.push(`/search/${search}`)
        
        console.log(search);
    }
const handleChange = (e) => {
        setSearch(e.target.value)

}
    return (
       
<form className="flex items-center justify-between w-[400px] max-w-md mx-auto rounded-lg bg-white py-1 px-2 shadow-lg overflow-hidden" onSubmit={handleSubmit}>   


    <div className="flex items-center ps-3 pointer-events-none">
        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </svg>
    </div>
    <input value={search} onChange={handleChange} type="search" id="default-search" class=" w-full p-2 text-sm text-gray-900 " placeholder="Search..." required />
    <button onClick={handleSubmit} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>

</form>

    );
}