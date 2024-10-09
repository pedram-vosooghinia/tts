"use client";
import PreFormaButtonTable from "./PreFormaButtonTable";
const preFormaTableItems = [
  {
    title: "شماره",
    value: (row) => row?.id,
  },
  {
    title: "نام مشتری",
    value: (row) => row?.customer.total_name,
  },
  {
    title: "نام بازاریاب",
    value: (row) => row?.customer.marketer_name,
  },
  {
    title: "مبلغ کل",
    value: (row) => row?.total_price,
  },
  {
    title: "تاریخ",
    value: (row) => row?.jalali_date_nopay,
  },
  {
    title: "عملیات",
    value: (row) => <PreFormaButtonTable item={row?.id} />,
  },
];
export default preFormaTableItems;
