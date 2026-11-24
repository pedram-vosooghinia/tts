export interface CategoryProduct {
  id: number;
  title: string;
  description: string | null;
  price: number;
  stock: number;
  is_active?: boolean;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  created_at: string;
  updated_at: string;
  products?: CategoryProduct[];
}

export interface CreateCategoryDto {
  name: string;
  slug: string;
  description?: string | null;
}

export type UpdateCategoryDto = Partial<CreateCategoryDto>;

export interface CategoryApiResponse {
  statusCode: number;
  data: Category;
  message: string;
}

export interface CategoriesApiResponse {
  statusCode: number;
  data: Category[];
  message: string;
}
