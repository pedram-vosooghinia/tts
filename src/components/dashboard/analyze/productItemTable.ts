"use client"
const productItemTable = [
  {
    title: "ماه - سال",
    value: (row) => row?.yearMonth,
  },
  {
    title: "تعداد کار",
    value: (row) => row?.totalItems,
  },
  {
    title: "میانگین قیمت",
    value: (row) => row?.avgPrice,
  },
  {
    title: "بیشترین قیمت",
    value: (row) => row?.maxPrice,
  },
  {
    title: "کمترین قیمت",
    value: (row) => row?.minPrice,
  }
];
export default productItemTable;
