"use client";
interface AnalyzeProductTable {
  title: string;
  value: (row: MonthlyStats) => string | number;
}

const analyzeProductTable: AnalyzeProductTable[] = [
  {
    title: "ماه - سال",
    value: (row) => row?.yearMonth || "",
  },
  {
    title: "تعداد کار",
    value: (row) => row?.totalItems || 0,
  },
  {
    title: "میانگین قیمت",
    value: (row) => row?.avgPrice || 0,
  },
  {
    title: "بیشترین قیمت",
    value: (row) => row?.maxPrice || 0,
  },
  {
    title: "کمترین قیمت",
    value: (row) => row?.minPrice || 0,
  },
];
export default analyzeProductTable;
