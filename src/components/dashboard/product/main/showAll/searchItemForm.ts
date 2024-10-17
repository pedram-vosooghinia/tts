"use client";

const searchItems: FormItem[][] = [
  [
    {
      id: 1,
      label: "کد محصول",
      type: "number",
      name: "barcode",
      required: true,
    },
  ],
];

const searchbutton = {
  label: "جستجوی محصول",
};

export { searchItems, searchbutton };
