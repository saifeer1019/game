import Router from "next/router";
import { useEffect } from "react";
import { Eye } from 'lucide-react';
export default function ViewAll() {

    return (
        <button
        onClick={() => window.location.href = `/search?query=all`}
        className="flex items-center gap-x-1 border border-light_ px-2 py-1 text-light_ text-sm sm:text-base hover:bg-cyan-500/10 transition-colors">
        <Eye className="w-4 h-4 sm:w-4 sm:h-4" />
        <span>View All</span>
      </button>
    )
}