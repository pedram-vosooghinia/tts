"use client";
interface Option {
  value: string;
  label: string;
}

interface Item {
  title: keyof MainProduct;
  content: string;
  options?: Option[];
}

export const items: Array<Item> = [
  { title: "product_name", content: "نام محصول:" },
  { title: "price", content: "قیمت:" },
  { title: "detail_color", content: " رنگ بندی:" },
  { title: "number_in_pack", content: "تعداد در جین:" },
  { title: "size", content: "ابعاد:" },
  { title: "detail_color", content: "جزییات رنگبندی:" },
];

export const optionitems: Array<Item> = [
  {
    title: "category",
    content: "دسته بندی:",
    options: [
      {
        value: "shawl",
        label: "شال",
      },
      {
        value: "scarf",
        label: "روسری",
      },
    ],
  },
  {
    title: "season",
    content: "فصل",
    options: [
      {
        value: "spring",
        label: "بهار",
      },
      {
        value: "summer",
        label: "تابستان",
      },
      {
        value: "fall",
        label: "پاییز",
      },
      {
        value: "winter",
        label: "زمستان",
      },
    ],
  },
];
