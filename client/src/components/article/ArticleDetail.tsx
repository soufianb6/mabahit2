import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Article, Category } from "@shared/schema";
import { format } from "date-fns";
import { ArrowRight, FileText, Calendar, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface ArticleDetailProps {
  id: number;
}

const ArticleDetail = ({ id }: ArticleDetailProps) => {
  const { toast } = useToast();
  
  const { data: article, isLoading: isArticleLoading, error: articleError } = useQuery<Article>({
    queryKey: [`/api/articles/${id}`],
  });
  
  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });
  
  useEffect(() => {
    if (articleError) {
      toast({
        title: "خطأ في التحميل",
        description: "حدث خطأ أثناء تحميل تفاصيل المقال",
        variant: "destructive",
      });
    }
  }, [articleError, toast]);
  
  if (isArticleLoading) {
    return <ArticleDetailSkeleton />;
  }
  
  if (!article) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card>
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-destructive mb-4">المقال غير موجود</h2>
            <p className="text-neutral-600 mb-6">لم يتم العثور على المقال المطلوب</p>
            <Button variant="default" onClick={() => window.history.back()}>
              <ArrowRight className="ml-2 h-4 w-4 transform rotate-180" />
              العودة
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  const category = categories.find(c => c.id === article.categoryId) || {
    id: 0,
    name: "غير مصنف",
    description: "",
    icon: "",
    color: ""
  };
  
  const formattedDate = format(new Date(article.publishDate), "d MMMM yyyy");
  
  const getCategoryBgColor = (color: string) => {
    switch (color) {
      case "blue": return "bg-blue-50 text-blue-600";
      case "green": return "bg-green-50 text-green-600";
      case "yellow": return "bg-yellow-50 text-yellow-600";
      case "red": return "bg-red-50 text-red-600";
      case "purple": return "bg-purple-50 text-purple-600";
      default: return "bg-slate-50 text-slate-600";
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardContent className="p-6 md:p-8">
          <div className="flex flex-wrap gap-3 mb-6">
            <Badge variant="outline" className={`${getCategoryBgColor(category.color)} font-medium px-3 py-1`}>
              {category.name}
            </Badge>
            <div className="flex items-center text-neutral-500">
              <Calendar className="h-4 w-4 ml-1" />
              {formattedDate}
            </div>
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold mb-6">{article.title}</h1>
          
          <div className="flex items-center mb-8 text-neutral-700">
            <User className="h-5 w-5 ml-2" />
            <div className="font-medium">{article.authors}</div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">ملخص البحث</h2>
            <div className="text-neutral-700 bg-neutral-50 p-4 rounded-lg border border-neutral-100">
              {article.abstract}
            </div>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <h2 className="text-xl font-semibold mb-4">المحتوى الكامل</h2>
            <div className="whitespace-pre-line">{article.content}</div>
          </div>
          
          <div className="mt-10 pt-6 border-t border-neutral-200">
            <a 
              href={article.pdfUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center"
            >
              <Button className="gap-2">
                <FileText className="h-5 w-5" />
                تحميل النسخة الكاملة (PDF)
              </Button>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export const ArticleDetailSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardContent className="p-6 md:p-8">
          <div className="flex flex-wrap gap-3 mb-6">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-8 w-24" />
          </div>
          
          <Skeleton className="h-10 w-full mb-6" />
          
          <div className="flex items-center mb-8">
            <Skeleton className="h-8 w-64" />
          </div>
          
          <div className="mb-8">
            <Skeleton className="h-8 w-32 mb-3" />
            <Skeleton className="h-24 w-full rounded-lg" />
          </div>
          
          <div>
            <Skeleton className="h-8 w-32 mb-4" />
            <Skeleton className="h-6 w-full mb-3" />
            <Skeleton className="h-6 w-full mb-3" />
            <Skeleton className="h-6 w-full mb-3" />
            <Skeleton className="h-6 w-3/4 mb-3" />
          </div>
          
          <div className="mt-10 pt-6 border-t border-neutral-200">
            <Skeleton className="h-10 w-48" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ArticleDetail;
