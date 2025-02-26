export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { isAxiosError } from "axios";
import { apiTetisan } from "@/services/api";
import { Product } from "@/types/product";
import { hashToPrice } from "@/utils/price/hashPrice";

export async function GET() {
  try {
    const productResponse = await apiTetisan.get("products/");
    const products = productResponse.data.result;

    if (!products.length) {
      return NextResponse.json({ error: "No products found" }, { status: 404 });
    }

    const productsWithImages = await Promise.all(
      products.map(async (product: Product) => {
        try {
          const englishName = product?.english_name ?? "";
          const match = englishName.match(/PRD-[A-F0-9]+_[A-F0-9]+/);
          const hashData = match ? hashToPrice(match[0]) : null;

          const omde_price = hashData ? hashData.price * 1000 : 0;
          const tak_price =
            hashData && omde_price !== null
              ? omde_price + (omde_price * hashData.percent) / 100
              : 0;

          const { stock_type, has_variants, ...filteredProduct } = product;
          const unUse = {
            stock_type,
            has_variants,
          };
          void unUse;

          return {
            ...filteredProduct,
            omde_price,
            tak_price,
          };
        } catch (error: unknown) {
          console.error(
            `Error fetching image for product ${product.id}:`,
            error
          );

          const { stock_type, has_variants, ...filteredProduct } = product;
          const unUse = {
            stock_type,
            has_variants,
          };
          void unUse;

          return {
            ...filteredProduct,
            image: null,
            omde_price: null,
            tak_price: null,
          };
        }
      })
    );
    return NextResponse.json(productsWithImages, { status: 200 });
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        { error: error.response?.data || "Failed to fetch data" },
        { status: error.response?.status || 500 }
      );
    }

    return NextResponse.json(
      { error: "Unexpected error occurred" },
      { status: 500 }
    );
  }
}
