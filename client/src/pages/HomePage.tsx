import { useQuery } from "@tanstack/react-query";
import { Article } from "@shared/schema";
import SearchBar from "@/components/home/SearchBar";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import ArticleList, { ArticleListSkeleton } from "@/components/article/ArticleList";

const HomePage = () => {
  const { data: articles = [], isLoading } = useQuery<Article[]>({
    queryKey: ["/api/articles/latest"],
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero section with search */}
      <section className="text-center py-12 max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">
          ابحث في ملايين المقالات العلمية والأبحاث المحكمة
        </h1>
        <p className="text-neutral-500 mb-8">
          اكتشف أحدث الأبحاث العلمية ذات الصلة بمجال اهتمامك
        </p>
        
        {/* Search form */}
        <SearchBar />
      </section>

      {/* Latest articles section */}
      {isLoading ? (
        <ArticleListSkeleton />
      ) : (
        <ArticleList articles={articles} />
      )}

      {/* Featured categories */}
      <FeaturedCategories />
    </div>
  );
};

export default HomePage;
