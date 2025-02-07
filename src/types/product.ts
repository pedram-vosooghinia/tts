export interface Product {
  id: string;
  available: boolean;
  name: string;
  brand: number
  english_name:string
  sale_type: string;
  price: number;
  image: string;
  stock_type?: string;
  omdePrice: number
}

export interface ProductAddProp {
  products: Product[];
}
