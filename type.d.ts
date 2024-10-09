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