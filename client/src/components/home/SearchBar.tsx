import { useState, FormEvent } from "react";
import { useLocation } from "wouter";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  className?: string;
  fullWidth?: boolean;
}

const SearchBar = ({ className = "", fullWidth = true }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [, navigate] = useLocation();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={`flex flex-col md:flex-row ${fullWidth ? 'max-w-2xl mx-auto' : ''} gap-2 ${className}`}
    >
      <div className="relative flex-grow">
        <Input
          type="search"
          placeholder="البحث عن مقالات، باحثين، أو مواضيع..."
          className="w-full py-6 px-4 rounded-lg"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button 
            type="button" 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
            onClick={clearSearch}
            aria-label="مسح"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
      <Button 
        type="submit" 
        className="bg-primary hover:bg-blue-600 text-white py-3 px-6 h-auto"
      >
        بحث
      </Button>
    </form>
  );
};

export default SearchBar;
