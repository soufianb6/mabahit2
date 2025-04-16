import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Article, Category } from "@shared/schema";
import ArticleCard from "./ArticleCard";
import { Grid, List } from "lucide-react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface ArticleListProps {
  articles: Article[];
  title?: string;
}

const ArticleList = ({ articles, title = "أحدث المقالات العلمية" }: ArticleListProps) => {
  const [viewType, setViewType] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;
  
  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });
  
  // Calculate pagination
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);
  const totalPages = Math.ceil(articles.length / articlesPerPage);
  
  const getCategoryForArticle = (categoryId: number) => {
    return categories.find(category => category.id === categoryId) || {
      id: 0,
      name: "غير مصنف",
      description: "",
      icon: "",
      color: ""
    };
  };
  
  return (
    <section className="my-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setViewType("grid")}
            className={viewType === "grid" ? "text-primary" : "text-neutral-500"}
          >
            <Grid className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setViewType("list")}
            className={viewType === "list" ? "text-primary" : "text-neutral-500"}
          >
            <List className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      {articles.length === 0 ? (
        <div className="text-center py-10 text-neutral-500">
          لا توجد مقالات متاحة
        </div>
      ) : (
        <>
          <div className={`grid ${viewType === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"} gap-6`}>
            {currentArticles.map((article) => (
              <ArticleCard 
                key={article.id} 
                article={article} 
                category={getCategoryForArticle(article.categoryId)}
              />
            ))}
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination className="mt-10">
              <PaginationContent>
                <PaginationItem>
                  <PaginationLink
                    onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className="transform rotate-180"
                  >
                    التالي
                  </PaginationLink>
                </PaginationItem>
                
                {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
                  // Show first page, last page, current page, and pages around current
                  let pageNum = i + 1;
                  if (totalPages > 5) {
                    if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                  }
                  
                  return (
                    <PaginationItem key={i}>
                      <PaginationLink
                        onClick={() => setCurrentPage(pageNum)}
                        isActive={currentPage === pageNum}
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}
                
                <PaginationItem>
                  <PaginationLink
                    onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    السابق
                  </PaginationLink>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </>
      )}
    </section>
  );
};

export const ArticleListSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="bg-white rounded-lg overflow-hidden border border-neutral-200 p-5">
          <div className="flex items-center mb-3">
            <Skeleton className="h-6 w-24" />
            <span className="mx-2 text-neutral-300">|</span>
            <Skeleton className="h-5 w-20" />
          </div>
          <Skeleton className="h-7 w-full mb-2" />
          <Skeleton className="h-5 w-full mb-2" />
          <Skeleton className="h-5 w-full mb-2" />
          <Skeleton className="h-5 w-full mb-4" />
          <div className="flex items-center text-sm mb-4">
            <Skeleton className="h-5 w-32" />
          </div>
          <div className="flex justify-between items-center pt-3 border-t border-neutral-100">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-24" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArticleList;
