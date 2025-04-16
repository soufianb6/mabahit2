import { Link } from "wouter";
import { Article, Category } from "@shared/schema";
import { format } from "date-fns";
import { ArrowRight, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ArticleCardProps {
  article: Article;
  category: Category;
}

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

const ArticleCard = ({ article, category }: ArticleCardProps) => {
  const formattedDate = format(new Date(article.publishDate), "d MMMM yyyy");
  
  return (
    <Card className="article-card bg-white rounded-lg overflow-hidden border border-neutral-200 transition hover:shadow-md">
      <CardContent className="p-5">
        <div className="flex items-center mb-3">
          <Badge variant="outline" className={`${getCategoryBgColor(category.color)} font-medium px-2.5 py-0.5`}>
            {category.name}
          </Badge>
          <span className="mx-2 text-neutral-300">|</span>
          <span className="text-neutral-500 text-sm">{formattedDate}</span>
        </div>
        
        <h3 className="text-lg font-bold mb-2">{article.title}</h3>
        
        <p className="text-neutral-600 mb-4 line-clamp-3">{article.abstract}</p>
        
        <div className="flex items-center text-sm mb-4">
          <span className="font-medium ml-1">الباحثون:</span>
          <span className="text-neutral-600">{article.authors}</span>
        </div>
        
        <div className="flex justify-between items-center pt-3 border-t border-neutral-100">
          <Link href={`/article/${article.id}`}>
            <Button variant="link" className="text-primary hover:underline font-medium flex items-center p-0 h-auto">
              قراءة المزيد
              <ArrowRight className="h-4 w-4 mr-1 transform rotate-180" />
            </Button>
          </Link>
          
          <a href={article.pdfUrl} target="_blank" rel="noopener noreferrer" className="flex items-center text-neutral-600 hover:text-primary">
            <FileText className="h-5 w-5 ml-1" />
            <span>تحميل PDF</span>
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

export default ArticleCard;
