import SearchBar from "@/components/widgets/SearchBar";
import Navbar from "@/components/Navbar";
import Filter from "@/components/widgets/Filter";
import Gallery from "@/components/widgets/PaginatedGallery";
export default function SearchPage() {
    return (
        <div className="relative min-h-screen flex flex-col justify-start">
        {/* full page gradient overlay */}
        <div className="absolute inset-0 bg-[rgb(17,17,17)]" style={{ zIndex: -5 }}></div>
        <Navbar />

<div className="flex flex-col items-start justify-center mt-14">
<div className='mx-10'>

         <h1 className="text-white text-4xl font-bold mt-10"> Games with tags: test tags, categories, etc</h1>

            <Filter />
            <div className="mt-4 self-start">
            <Gallery />
            </div>
</div>
    
        </div>
        </div>
    );
}