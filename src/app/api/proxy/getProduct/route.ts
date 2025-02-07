export const dynamic = "force-dynamic";

import { NextResponse } from 'next/server';
import {  isAxiosError } from 'axios';
import { apiTetisan } from '@/services/api';
import { Product } from '@/types/product';
import { hashToPrice } from '@/utils/price/hashPrice';
export async function GET() {
  try {
    const productResponse  = await apiTetisan.get("products/");
    const products = productResponse.data.result;

    if (!products.length) {
      return NextResponse.json({ error: "No products found" }, { status: 404 });
    }

    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    const productsWithImages: Product[] = [];
    for (const product of products) {
      try {
        await delay(100); 
        const imageResponse = await apiTetisan.get(`products/${product.id}/images`);
        const images = imageResponse.data.result;
        const englishName = product?.english_name ?? "";
        const match = englishName.match(/PRD-[A-F0-9]+/);
        const omdePrice: number | null = match ? hashToPrice(match[0]) : null;

        
        productsWithImages.push({
          ...product,
          image: images.length > 0 ? images[0].image : null,
          omdePrice,
        });
      } catch (error: unknown) {
        console.error(`Error fetching image for product ${product.id}:`, error);
        productsWithImages.push({ ...product, image: null });
      }
    }
    

    return NextResponse.json(productsWithImages, { status: 200 });
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      console.error("API Fetch Error:", error.response?.status, error.response?.data);
      return NextResponse.json(
        { error: error.response?.data || "Failed to fetch data" },
        { status: error.response?.status || 500 }
      );
    }

    console.error("Unexpected Error:", error);
    return NextResponse.json({ error: "Unexpected error occurred" }, { status: 500 });
  }
}