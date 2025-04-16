import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Category } from "@shared/schema";
import { 
  BeakerIcon, 
  Users, 
  Laptop, 
  Heart, 
  BookOpen 
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const getCategoryIcon = (icon: string) => {
  switch (icon) {
    case "flask": return <BeakerIcon className="h-10 w-10 mx-auto" />;
    case "users": return <Users className="h-10 w-10 mx-auto" />;
    case "laptop": return <Laptop className="h-10 w-10 mx-auto" />;
    case "heart": return <Heart className="h-10 w-10 mx-auto" />;
    case "book": return <BookOpen className="h-10 w-10 mx-auto" />;
    default: return <BookOpen className="h-10 w-10 mx-auto" />;
  }
};

const getCategoryGradient = (color: string) => {
  switch (color) {
    case "blue": return "bg-gradient-to-br from-blue-500 to-blue-600";
    case "green": return "bg-gradient-to-br from-green-500 to-green-600";
    case "yellow": return "bg-gradient-to-br from-yellow-500 to-yellow-600";
    case "red": return "bg-gradient-to-br from-red-500 to-red-600";
    case "purple": return "bg-gradient-to-br from-purple-500 to-purple-600";
    default: return "bg-gradient-to-br from-slate-500 to-slate-600";
  }
};

const getCategoryTextColor = (color: string) => {
  switch (color) {
    case "blue": return "text-blue-100";
    case "green": return "text-green-100";
    case "yellow": return "text-yellow-100";
    case "red": return "text-red-100";
    case "purple": return "text-purple-100";
    default: return "text-slate-100";
  }
};

const FeaturedCategories = () => {
  const { data: categories = [], isLoading, error } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  if (isLoading) {
    return <div className="text-center py-8">جاري تحميل التصنيفات...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-destructive">حدث خطأ أثناء تحميل التصنيفات</div>;
  }

  return (
    <section className="my-16">
      <h2 className="text-2xl font-bold mb-8">استكشف المجالات العلمية</h2>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {categories.map((category) => (
          <Link key={category.id} href={`/category/${category.id}`}>
            <Card 
              className={`${getCategoryGradient(category.color)} text-white rounded-lg p-6 text-center hover:shadow-lg transition cursor-pointer`}
            >
              <CardContent className="p-0">
                <div className="mb-4">
                  {getCategoryIcon(category.icon)}
                </div>
                <h3 className="text-lg font-bold">{category.name}</h3>
                <p className={`${getCategoryTextColor(category.color)} mt-2`}>{category.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCategories;
