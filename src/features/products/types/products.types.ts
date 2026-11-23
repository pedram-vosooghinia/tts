export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProductImage {
  id: number;
  image: string;
  image_alt?: string;
  default?: boolean;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  stock: number;
  is_active?: boolean;
  created_at: string;
  updated_at: string;
  categories: Category[];
  images?: ProductImage[];
}

export interface CreateProductDto {
  title: string;
  description: string;
  price: number;
  stock?: number;
  categoryIds: number[];
}

export type UpdateProductDto = Partial<CreateProductDto>;

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ProductsResponse {
  data: Product[];
  meta: PaginationMeta;
}

export interface ApiResponse<T> {
  statusCode: number;
  data: T;
  message: string;
}
