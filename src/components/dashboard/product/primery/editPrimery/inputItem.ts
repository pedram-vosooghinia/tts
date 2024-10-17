"use client";

const editPrimeryItems: FormItem[][] = [
  [
    {
      id: 1,
      label: "دسته بندی",
      type: "select",
      name: "category",
      required: true,

      option: [
        {
          value: "",
          label: "",
        },
        {
          value: "scarf",
          label: "روسری",
        },
        {
          value: "shawl",
          label: "شال",
        },
      ],
    },
    {
      id: 2,
      label: "فصل",
      type: "select",
      name: "season",
      required: true,
      option: [
        {
          value: "",
          label: "",
        },
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
  ],
  [
    {
      id: 3,
      label: "نام محصول",
      type: "text",
      name: "product_name",
      required: true,
    },
  ],
  [
    {
      id: 4,
      label: "جزییات رنگ بندی",
      type: "text",
      name: "detail_color",
      required: true,
    },
  ],
  [
    {
      id: 5,
      label: "تعداد در بسته",
      type: "number",
      name: "number_in_pack",
      required: true,
    },
    {
      id: 6,
      label: "قیمت",
      type: "number",
      name: "price",
      required: true,
    },
  ],
  [
    {
      id: 7,
      label: "قواره",
      type: "text",
      name: "size",
      required: true,
    },
    {
      id: 8,
      label: "تیتر",
      type: "select",
      name: "title",
      required: false,
      option: [
        {
          value: "",
          label: "",
        },
        {
          value: "moharam",
          label: "⚫️ #محرم ⚫️",
        },
        {
          value: "yalda",
          label: "🍉 #یلدا 🍉",
        },
        {
          value: "eyd",
          label: "🌺 #عیدانه 🌺",
        },
      ],
    },
  ],
  [
    {
      id: 9,
      label: "موجودی",
      type: "number",
      name: "inventory",
      required: true,
    },
    {
      id: 10,
      label: "مقدار مجاز سفارش",
      type: "number",
      name: "validation_value",
      required: true,
    },
  ],
  [
    {
      id: 11,
      label: "کد انبار",
      type: "number",
      name: "sell_code",
      required: false,
    },
    {
      id: 12,
      label: "شخص",
      type: "text",
      name: "person",
      required: false,
    },
  ],
];

const editPrimerybutton = {
  label: "تایید نهایی و افزودن",
};

export { editPrimeryItems, editPrimerybutton };
