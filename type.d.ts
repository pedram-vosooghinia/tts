// stores
interface User {
  username: string;
  family: string;
  email: string;
  user_role: string;
  password?: string,
}

//pages
interface MountOrdersProps {
  data: Order[];
  month: string;
}
//data
interface Order {
  clear_profit: string;
  total_value: string;
  final_pay: string;
  total_price: string;
  discount_amount: string;
  marketer_discount: string;
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

//
interface MainProduct {
  id: number;
  barcode: number;
  category: string;
  season: string;
  product_name: string;
  detail_color: string;
  number_in_pack: number;
  price: number;
  size: string;
  title: string;
  inventory: number;
  validation_value: number;
  sell_code: number;
  person: string;
  images: { image1: string; [key: string]: string };
}



//hashtags

interface Hashtag {
  created_at: string;
  created_by_id: number;
  document_id: string;
  hashtag: string;
  published_at: string;
  updated_at: string;
  updated_by_id: number;
  name:string
};

