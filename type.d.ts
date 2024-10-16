
// stores
interface User {
  name: string;
  mobile: string;
  first_name: string;
  last_name: string;
  role: string;
}
interface Customer {
  name: string;
  mobile: string;
  first_name: string;
  last_name: string;
  role: string;
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

//login
interface LoginFormInputs {
  mobile: string;
  password: string;
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
  type: "file" | "textarea";
  name: string;
  placeholder?: string;
  error?: string;
  maxLength?: number;
  required?: boolean;
  // defaultValue?: any;
}

interface ButtonItem {
  label: string;
}

interface PFormProps<T extends FormItem> {
  Items: T[][];
  button: ButtonItem;
  onSubmit: SubmitHandler<T>;
}


//primery product

type PrimeryCardProps<T> = {
  products: T[];
};