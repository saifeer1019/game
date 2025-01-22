import Router from "next/router";
import { useEffect } from "react";
import {  ChevronRight } from 'lucide-react';
export default function ViewMore() {

    return (
    <button
    onClick={() => window.location.href = `/search?query=all`}
    className="flex items-center w-fit tracking-wide mt-2 gap-x-1  py-1 text-light_ text-sm sm:text-base hover:bg-cyan-500/10 transition-colors">
   
   <span>View more</span>
   <ChevronRight className="self-center w-4 h-4 sm:w-4 sm:h-4" />
 </button>
    )
}