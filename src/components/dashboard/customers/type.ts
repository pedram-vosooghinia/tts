export interface Customer  {
    customer_name: string
    mobile: string;
    city: string;
    seller_name: string;
    document_id?: string;
  }
  
  export interface CustomerAddProp {
    products: Customer[];
  }
  