export interface Product {
  id: string;
  available: boolean;
  name: string;
  brand: number
  english_name:string
  price: number;
  image: string;
  omde_price: number
  has_variants: boolean;
  main_category: number;
  tak_price: number;
  stock_type?:string
}


export interface ProductAddProp {
  products: Product[];
}
