import { useQuery } from "@tanstack/react-query";
import { Category } from "@shared/schema";

export function useCategories() {
  return useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });
}

export function useCategory(id: number) {
  return useQuery<Category>({
    queryKey: [`/api/categories/${id}`],
    enabled: !isNaN(id) && id > 0,
  });
}
