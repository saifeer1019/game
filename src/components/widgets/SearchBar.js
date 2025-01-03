"use client"
import { useState } from "react";
import {useRouter} from "next/navigation";

export default function SearchBar() {
    const [search, setSearch] = useState('');
    const router = useRouter()

    const handleSubmit = (e) => {
        e.preventDefault();
        router.push(`/search?query=${search}`)
        
        console.log(search);
    }
const handleChange = (e) => {
        setSearch(e.target.value)

}
    return (
       
<form className="flex items-center justify-between w-[400px] max-w-md mx-auto rounded-lg bg-white py-1 px-2 shadow-lg overflow-hidden" onSubmit={handleSubmit}>   


    <div className="flex items-center ps-3 pointer-events-none">
        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </svg>
    </div>
    <input value={search} onChange={handleChange} type="search" id="default-search" className=" w-full p-2 text-sm text-gray-900 " placeholder="Search..." required />
    <button onClick={handleSubmit} className="text-white bg-accent_ hover:bg-hover_ focus:ring-4 focus:outline-none focus:ring-hover_ font-medium rounded-lg text-sm px-4 py-2 ">Search</button>

</form>

    );
}