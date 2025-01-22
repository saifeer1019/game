import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const NavMenu = () => {
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
  });

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
  }, []);

  const ListItem = ({ href, children }) => {
    return (
      <Link 
        href={href}
        className="block p-2 text-light_ hover:bg-hover_ hover:text-light_ rounded-md transition-colors"
      >
        {children}
      </Link>
    );
  };

  return (
    <NavigationMenu className="bg-primary_ rounded-lg">
      <NavigationMenuList className="flex space-x-4">
        {/* Tags Menu Item */}
        <NavigationMenuItem className="relative">
          <NavigationMenuTrigger className="text-light_ md:text-lg bg-primary_ hover:text-light_ hover:bg-hover_ focus:bg-hover_ transition-colors">
            Tags
          </NavigationMenuTrigger>
          <NavigationMenuContent className="absolute left-0 bg-secondary_ rounded-md shadow-lg min-w-[200px] w-[280px] md:w-[320px]">
            <div className="max-h-[60vh] overflow-y-auto p-4" style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#d92365 #161618'
            }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {categories.tags.map((tag) => (
                  <ListItem key={tag.id} href={`/search?query=all&tag=${tag.name}`}>
                    {tag.name}
                  </ListItem>
                ))}
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Developers Menu Item */}
        <NavigationMenuItem className="relative">
          <NavigationMenuTrigger className="text-light_ md:text-lg bg-primary_ hover:text-light_ hover:bg-hover_ focus:bg-hover_ transition-colors">
            Developers
          </NavigationMenuTrigger>
          <NavigationMenuContent className="absolute left-0 bg-secondary_ rounded-md shadow-lg min-w-[200px] w-[280px] md:w-[320px]">
            <div className="max-h-[60vh] overflow-y-auto p-4" style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#d92365 #161618'
            }}>
              <div className="grid grid-cols-1 gap-2">
                {categories.developers.map((developer) => (
                  <ListItem key={developer.id} href={`/search?query=all&developer=${developer.name}`}>
                    {developer.name}
                  </ListItem>
                ))}
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Genres Menu Item */}
        <NavigationMenuItem className="relative  bg-primary_ border-none ">
          <NavigationMenuTrigger className="text-light_ md:text-lg bg-primary_ hover:text-light_ hover:bg-hover_ focus:bg-hover_ transition-colors">
            Genres
          </NavigationMenuTrigger>
          <NavigationMenuContent className="absolute left-0 bg-secondary_  rounded-[10px] shadow-lg min-w-[200px] w-[280px] md:w-[320px]">
            <div className="max-h-[60vh] overflow-y-auto p-4" style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#d92365 #161618'
            }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {categories.genres.map((genre) => (
                  <ListItem key={genre.id} href={`/search?query=all&genre=${genre.name}`}>
                    {genre.name}
                  </ListItem>
                ))}
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavMenu;