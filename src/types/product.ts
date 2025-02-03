export interface Product {
  document_id: string;
  product_name: string;
  brand: string;
  sale_type: string;
  price: number;
  barcode: number;
  files: File[];
}

export interface ProductAddProp {
  products: Product[];
}
