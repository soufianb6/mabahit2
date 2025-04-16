import { useQuery } from "@tanstack/react-query";
import { Article } from "@shared/schema";

export function useLatestArticles(limit = 6) {
  return useQuery<Article[]>({
    queryKey: [`/api/articles/latest?limit=${limit}`],
  });
}

export function useArticle(id: number) {
  return useQuery<Article>({
    queryKey: [`/api/articles/${id}`],
    enabled: !isNaN(id) && id > 0,
  });
}

export function useArticlesByCategory(categoryId: number) {
  return useQuery<Article[]>({
    queryKey: [`/api/articles/category/${categoryId}`],
    enabled: !isNaN(categoryId) && categoryId > 0,
  });
}

export function useSearchArticles(query: string) {
  return useQuery<Article[]>({
    queryKey: [`/api/search?q=${encodeURIComponent(query)}`],
    enabled: query.length > 0,
  });
}
