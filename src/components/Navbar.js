"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import SearchBar from "./widgets/SearchBar";
import {useRouter} from "next/navigation";
export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // Track active dropdown
  const router = useRouter()
  const handleAdmin = (e) => {
    e.preventDefault();
    router.push(`/admin`)

   
    
    console.log(search);
}
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const categories = [
    {
      title: "Genres",
      items: ["2DCG", "Adventure", "Dating Sim", "Fantasy", "Horror", "RPG", "Sci-Fi", "Strategy", "Simulator"],
    },
    {
      title: "Themes",
      items: ["Female Domination", "Harem", "Humiliation", "Incest", "Mind Control", "Paranormal", "Romance"],
    },
    {
      title: "Tags",
      items: [
        "Animated",
        "Big Tits",
        "Furry",
        "Lesbian",
        "Male Domination",
        "Monster Girl",
        "Tentacles",
        "Transformation",
      ],
    },
  ];

  const toggleDropdown = (title) => {
    setActiveDropdown(activeDropdown === title ? null : title);
  };

  return (
    <nav
      className={`fixed h-20 mb-8 sm:mb-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-primary_ shadow-lg"
          : "bg-gradient-to-b from-primary_ via-primary_/80 to-transparent"
      }`}
    >
      <div className="px-6 md:px-10 py-4 flex items-center justify-between">
        {/* Left side - Logo and Desktop Navigation */}
        <div className="flex items-center space-x-8">
          <Link href="/">
            <h1 className="text-accent_ font-extrabold text-3xl hover:text-hover_ transition-colors">
              GameVault
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 text-base text-light_ items-center">
            <Link href="/" className="hover:text-accent_ transition-colors">
              Home
            </Link>

            {/* Categories with Dropdown */}
            <div className="relative group">
              <button
                onClick={() => toggleDropdown("Categories")}
                className="hover:text-accent_ transition-colors flex items-center space-x-1"
              >
                <span>Categories</span>
                <ChevronDown size={16} />
              </button>
              <div
                className={`absolute top-full left-0 w-64 bg-primary_/95 shadow-md mt-2 p-4 rounded-lg z-50 ${
                  activeDropdown === "Categories" ? "block" : "hidden"
                } group-hover:block`}
              >
                {categories.map((category) => (
                  <div key={category.title} className="mb-4">
                    <h3 className="text-sm text-light_/80 uppercase font-semibold mb-2">
                      {category.title}
                    </h3>
                    <ul className="space-y-1">
                      {category.items.map((item) => (
                        <li key={item}>
                          <Link
                            href={`/categories/${item.toLowerCase().replace(/ /g, "-")}`}
                            className="text-light_ hover:text-accent_ text-sm transition-colors"
                          >
                            {item}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          <div className="hidden sm:block">
            <SearchBar />
          </div>
         

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-light_ p-2 hover:text-accent_ transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-20 left-0 right-0 bg-primary_/95 backdrop-blur-sm border-t border-gray-800">
          <div className="px-4 py-2 sm:hidden">
            <SearchBar />
          </div>
          <div className="flex flex-col space-y-4 px-6 py-4">
            <Link
              href="/"
              className="text-light_ hover:text-accent_ transition-colors text-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            {categories.map((category) => (
              <div key={category.title}>
                <h3 className="text-light_/80 text-sm uppercase font-semibold mb-2">
                  {category.title}
                </h3>
                <ul className="space-y-1">
                  {category.items.map((item) => (
                    <li key={item}>
                      <Link
                        href={`/categories/${item.toLowerCase().replace(/ /g, "-")}`}
                        className="text-light_ hover:text-accent_ transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
