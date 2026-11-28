import type { SWRConfiguration } from "swr";

import HomeContent from "@/components/home/HomeContent";
import SwrFallbackProvider from "@/provider/SwrFallbackProvider";
import { API_BASE_URL } from "@/lib/api-url";
import type { Category } from "@/features/categories/types/category.types";
import type { ProductsResponse } from "@/features/products/types/products.types";

const PRODUCTS_KEY = "/products?page=1&limit=6";

async function getJson<T>(path: string): Promise<T | undefined> {
  try {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) return undefined;

    const json = (await res.json()) as { data?: T };
    return json.data;
  } catch {
    return undefined;
  }
}

export default async function HomePage() {
  const [categories, products] = await Promise.all([
    getJson<Category[]>("/categories"),
    getJson<ProductsResponse>(PRODUCTS_KEY),
  ]);

  const fallback: NonNullable<SWRConfiguration["fallback"]> = {};
  if (categories) fallback["/categories"] = categories;
  if (products) fallback[PRODUCTS_KEY] = products;

  return (
    <SwrFallbackProvider fallback={fallback}>
      <HomeContent />
    </SwrFallbackProvider>
  );
}
