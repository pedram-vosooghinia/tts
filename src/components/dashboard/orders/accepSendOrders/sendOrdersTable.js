"use client";
import SendOrderButton from "./SendOrderButton";

const sendOrdersTable = [
  {
    title: "شماره",
    value: (row) => row?.barcode,
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
    value: (row) => row?.jalali_date_pay,
  },
  {
    title: "عملیات",
    value: (row) => <SendOrderButton orderId={row?.id} />,
  },
];
export default sendOrdersTable;
