import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Category } from "@shared/schema";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();
  
  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex flex-wrap items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="mr-2 text-xl font-semibold text-neutral-900">باحث علمي عربي</span>
        </Link>
        
        {/* Mobile menu button */}
        <Button 
          variant="outline" 
          size="icon" 
          className="md:hidden" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu className="h-6 w-6" />
        </Button>
        
        {/* Navigation menu */}
        <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:flex w-full md:w-auto mt-4 md:mt-0`}>
          <ul className="flex flex-col md:flex-row md:items-center md:space-x-6 md:space-x-reverse">
            {categories.map((category) => (
              <li key={category.id}>
                <Link 
                  href={`/category/${category.id}`} 
                  className={`block py-2 px-3 md:px-0 hover:text-primary transition-colors ${
                    location === `/category/${category.id}` ? 'text-primary' : 'text-neutral-900'
                  }`}
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
