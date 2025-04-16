import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Article } from "@shared/schema";
import ArticleList, { ArticleListSkeleton } from "@/components/article/ArticleList";
import SearchBar from "@/components/home/SearchBar";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";

const SearchPage = () => {
  const [location] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Extract query from URL parameters
  useEffect(() => {
    const params = new URLSearchParams(location.split("?")[1]);
    const q = params.get("q");
    if (q) {
      setSearchQuery(q);
    }
  }, [location]);
  
  const { data: articles = [], isLoading } = useQuery<Article[]>({
    queryKey: [`/api/search?q=${encodeURIComponent(searchQuery)}`],
    enabled: searchQuery.length > 0,
  });
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold mb-4">بحث متقدم</h1>
          <SearchBar fullWidth={false} />
        </CardContent>
      </Card>
      
      {searchQuery && (
        <div className="mb-6">
          <h2 className="text-lg text-neutral-600 flex items-center">
            <Search className="h-5 w-5 ml-2" />
            نتائج البحث عن: <span className="font-bold mr-2">{searchQuery}</span>
            <span className="mr-2 text-neutral-500">({articles.length} نتيجة)</span>
          </h2>
        </div>
      )}
      
      {isLoading ? (
        <ArticleListSkeleton />
      ) : searchQuery ? (
        <ArticleList 
          articles={articles} 
          title={articles.length > 0 ? "نتائج البحث" : ""}
        />
      ) : (
        <Card>
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-medium text-neutral-600 mb-4">الرجاء إدخال كلمات البحث</h2>
            <p className="text-neutral-500">يمكنك البحث عن المقالات بالعنوان، الملخص، المحتوى، أو أسماء الباحثين</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SearchPage;
