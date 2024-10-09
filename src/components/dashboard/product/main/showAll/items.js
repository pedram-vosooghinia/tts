"use client"

export const items = [
    { title: "product_name", content: "نام محصول:" },
    { title: "price", content: "قیمت:" },
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
    { title: "season", content: "فصل"  ,   options: [
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
    ],},
    { title: "detail_color", content: " رنگ بندی:" },
    { title: "number_in_pack", content: "تعداد در جین:" },
    { title: "size", content: "ابعاد:" },
    { title: "detail_color", content: "جزییات رنگبندی:" },
  ];