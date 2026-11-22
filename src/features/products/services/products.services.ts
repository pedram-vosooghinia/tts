
import { api } from "@/services/api";

import type {
  Product,
  CreateProductDto,
  UpdateProductDto,
  ApiResponse,
  ProductsResponse,
} from "../types/products.types";

// Get all products
export const getProductsService = async (
  page = 1,
  limit = 10,
  categoryId?: number,
): Promise<ProductsResponse> => {
  const res = await api.get<ApiResponse<ProductsResponse>>("/products", {
    params: { page, limit, ...(categoryId ? { categoryId } : {}) },
  });

  return res.data.data;
};

// Get product by ID
export const getProductService = async (
  id: number
): Promise<Product> => {
  const res = await api.get<ApiResponse<Product>>(`/products/${id}`);

  return res.data.data;
};

// Create product
export const createProductService = async (
  data: CreateProductDto
): Promise<Product> => {
  const res = await api.post<ApiResponse<Product>>("/products", data);

  return res.data.data;
};

// Update product
export const updateProductService = async (
  id: number,
  data: UpdateProductDto
): Promise<Product> => {
  const res = await api.patch<ApiResponse<Product>>(
    `/products/${id}`,
    data
  );

  return res.data.data;
};

// Delete product
export const deleteProductService = async (
  id: number
): Promise<void> => {
  await api.delete(`/products/${id}`);
};
