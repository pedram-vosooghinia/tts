import { api } from "@/services/api";

import type {
  Category,
  CreateCategoryDto,
  UpdateCategoryDto,
  CategoryApiResponse,
  CategoriesApiResponse,
} from "../types/category.types";

// Get all categories
export const getCategoriesService = async (): Promise<Category[]> => {
  const res = await api.get<CategoriesApiResponse>("/categories");

  return res.data.data;
};

// Get category by ID
export const getCategoryService = async (id: number): Promise<Category> => {
  const res = await api.get<CategoryApiResponse>(`/categories/${id}`);

  return res.data.data;
};

// Create category
export const createCategoryService = async (
  data: CreateCategoryDto,
): Promise<Category> => {
  const res = await api.post<CategoryApiResponse>("/categories", data);

  return res.data.data;
};

// Update category
export const updateCategoryService = async (
  id: number,
  data: UpdateCategoryDto,
): Promise<Category> => {
  const res = await api.patch<CategoryApiResponse>(`/categories/${id}`, data);

  return res.data.data;
};

// Delete category
export const deleteCategoryService = async (id: number): Promise<void> => {
  await api.delete(`/categories/${id}`);
};
