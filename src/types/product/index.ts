
export interface ProductImage {
  id: number;
  image: string;
  image_alt: string;
  default: boolean;
}

export interface ProductItem {
  id: number;
  name: string;
  english_name: string;
  brand: string;
  main_category: number;
  has_variants: boolean;
  price: number;
  compare_at_price?: number; // بعضی مواقع ممکنه نباشه
  available: boolean;
  stock_type: string; // "unlimited" | "limited" ? می‌تونی union بذاری
  images: ProductImage[];
}
