import { useParams } from "wouter";
import ArticleDetail from "@/components/article/ArticleDetail";

const ArticlePage = () => {
  const params = useParams<{ id: string }>();
  const articleId = parseInt(params.id);

  if (isNaN(articleId)) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-destructive">معرف المقال غير صالح</h1>
      </div>
    );
  }

  return <ArticleDetail id={articleId} />;
};

export default ArticlePage;
