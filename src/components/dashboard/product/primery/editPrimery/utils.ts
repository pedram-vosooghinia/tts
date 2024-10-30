"use client";
import toast from "react-hot-toast";

export const cleanText = (text:string) => {
  let cleanedText = text.replace(/\n+/g, "\n");
  cleanedText = cleanedText.replace(/#/g, "");
  return cleanedText;
};

export const handleCopy = (text:string) => {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success("متن کپی شد");
      })
      .catch(() => {
        toast.error("خطا در کپی کردن متن");
      });
  } else {
    toast.error("مرورگر شما از قابلیت کپی پشتیبانی نمی‌کند.");
  }
};
