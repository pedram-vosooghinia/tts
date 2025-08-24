//product
interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  description: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface ProductAddProp {
  products: Product[];
}

//pages
interface MountOrdersProps {
  data: Order[];
  month: string;
}


//utils
interface JalaliDate {
  year: string;
  month: string;
  day: string;
  fullDate: string;
}

//Analyze
interface ProductData {
  jalali_date_chanell: string;
  price: string;
  barcode: number;
  category: string;
}
interface MonthlyStats {
  yearMonth: string;
  totalItems: number;
  avgPrice: string;
  maxPrice: number;
  minPrice: number;
}

//pForm

interface FormItem {
  id: number;
  label: string;
  type: "file" | "textarea" | "select" | "text" | "number";
  name: string;
  placeholder?: string;
  error?: string;
  maxLength?: number;
  required?: boolean;
  option?: Array<{
    value: string;
    label: string;
  }>;
}

interface ButtonItem {
  label: string;
}

interface PFormProps<T extends FormItem> {
  Items: T[][];
  button: ButtonItem;
  onSubmit: SubmitHandler<T>;
}




//cart
interface MoveToShippingProps {
  totalInvoice: number;
}

interface MoveToShippingRequestProps {
  customer_id: id | null;
  total_price: number;
  order_items: OrderItem[];
  
}

//order
interface OrderItem {
  product_name: string;
  document_id: number;
  quantity: number;
  price: number;
  image: string
  category:string
}


interface Order {
  total_price: number;
  order_items: OrderItem[];
  date: string;
}

 interface CartItem {
  quantity: number;
  product: Product
}

 interface CartState {
  cart: {
    cartItems: CartItem[];
  };
  firstAddToCart: (newItem: CartItem) => void;
  increaseValueCart: (newItem: CartItem) => void;
  decreaseValueCart: (item: CartItem) => void;
  deleteValueCart: (item: CartItem) => void;
  deleteAllCart: () => void;
}

 interface ProductCartProps {
  product: Product;
}

 interface LoginFormInputs {
    mobile: string;
    password: string;
  }
  


 interface SignInFormInputs {
  firstName: string;
  lastName: string;
    mobile: string
    password: string,
  }
  
// stores
 interface User {
    first_name: string;
    last_name: string;
    mobile: string;
    role: string;
    password?: string,
  }