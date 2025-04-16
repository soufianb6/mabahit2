import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Article, Category } from "@shared/schema";
import ArticleList, { ArticleListSkeleton } from "@/components/article/ArticleList";
import { Card, CardContent } from "@/components/ui/card";
import { 
  BeakerIcon, 
  Users, 
  Laptop, 
  Heart, 
  BookOpen 
} from "lucide-react";

const getCategoryIcon = (icon: string) => {
  switch (icon) {
    case "flask": return <BeakerIcon className="h-10 w-10" />;
    case "users": return <Users className="h-10 w-10" />;
    case "laptop": return <Laptop className="h-10 w-10" />;
    case "heart": return <Heart className="h-10 w-10" />;
    case "book": return <BookOpen className="h-10 w-10" />;
    default: return <BookOpen className="h-10 w-10" />;
  }
};

const getCategoryGradient = (color: string) => {
  switch (color) {
    case "blue": return "bg-gradient-to-r from-blue-500 to-blue-600";
    case "green": return "bg-gradient-to-r from-green-500 to-green-600";
    case "yellow": return "bg-gradient-to-r from-yellow-500 to-yellow-600";
    case "red": return "bg-gradient-to-r from-red-500 to-red-600";
    case "purple": return "bg-gradient-to-r from-purple-500 to-purple-600";
    default: return "bg-gradient-to-r from-slate-500 to-slate-600";
  }
};

const CategoryPage = () => {
  const params = useParams<{ id: string }>();
  const categoryId = parseInt(params.id);

  const { data: category, isLoading: isCategoryLoading } = useQuery<Category>({
    queryKey: [`/api/categories/${categoryId}`],
    enabled: !isNaN(categoryId),
  });

  const { data: articles = [], isLoading: isArticlesLoading } = useQuery<Article[]>({
    queryKey: [`/api/articles/category/${categoryId}`],
    enabled: !isNaN(categoryId),
  });

  if (isNaN(categoryId)) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-destructive">معرف التصنيف غير صالح</h1>
      </div>
    );
  }

  const isLoading = isCategoryLoading || isArticlesLoading;

  return (
    <div className="container mx-auto px-4 py-8">
      {isLoading ? (
        <div className="animate-pulse">
          <div className="h-40 rounded-lg bg-neutral-200 mb-8"></div>
          <ArticleListSkeleton />
        </div>
      ) : category ? (
        <>
          <Card className={`${getCategoryGradient(category.color)} text-white mb-8 overflow-hidden`}>
            <CardContent className="p-8 flex flex-col md:flex-row items-center gap-6">
              <div className="bg-white/20 p-4 rounded-full">
                {getCategoryIcon(category.icon)}
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
                <p className="text-white/90 text-lg">{category.description}</p>
              </div>
            </CardContent>
          </Card>
          <ArticleList 
            articles={articles} 
            title={`المقالات في ${category.name}`} 
          />
        </>
      ) : (
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-destructive">لم يتم العثور على التصنيف</h1>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
