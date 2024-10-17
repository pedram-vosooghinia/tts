"use client";
export const seasonTranslate = (product: MainProduct) => {
  if (product?.season === "spring") {
    return "بهار 1403";
  } else if (product?.season === "summer") {
    return "تابستان 1403";
  } else if (product?.season === "fall") {
    return "پاییز 1403";
  } else if (product?.season === "winter") {
    return "زمستان 1403";
  } else {
    return "فصل نامشخص";
  }
};
export const topEmoje = (product: MainProduct) => {
  if (product?.season === "spring") {
    return "🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀";
  } else if (product?.season === "summer") {
    return "🌻🌻🌻🌻🌻🌻🌻🌻🌻🌻🌻🌻🌻🌻";
  } else if (product?.season === "fall") {
    return "🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁";
  } else if (product?.season === "winter") {
    return "❄️❄️❄️❄️❄️❄️❄️❄️❄️❄️❄️❄️❄️❄️";
  } else {
    return "ایموجی نامشخص";
  }
};

export const categoryTranslate = (product: MainProduct) => {
  if (product?.category === "scarf") {
    return "روسری";
  } else if (product?.category === "shawl") {
    return "شال";
  } else {
    return "دسته بندی نامشخص";
  }
};

export const titleTranslate = (product: MainProduct) => {
  if (product?.title === "moharam") {
    return "⚫️ #محرم ⚫️";
  } else if (product?.title === "yalda") {
    return "🍉 #یلدا 🍉";
  } else if (product?.title === "eyd") {
    return "🌺 #عیدانه 🌺";
  } else {
    return "";
  }
};

const shawlHashtag = ["#روسری", "#شال_نخی", "#شالوروسری"];
const scarfHashtag = ["#شال", "#روسری_نخی", "#روسری_مجلسی"];
const randomHashtagMainMil = [
  "#ترند",
  "#explore",
  "#بازار",
  "#بازارتهران",
  "#عمده",
  "#عمده_فروشی",
  "#عمده_فروشي",
  "#پخش_عمده",
  "#تولیدی",
  "#حراجی",
  "#ارزان",
  "#ارزانسرا",
  "#عمده",
  "#شال_روسری",
];
const getRandomHashtags = (hashtags: string[], count: number): string[] => {
  const shuffled = hashtags.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const generateDetails = (product: MainProduct) => {
  const categoryShow = categoryTranslate(product);
  const season = seasonTranslate(product);
  const title = titleTranslate(product);
  const Emoje = topEmoje(product);
  const hashtagText = [];

  if (product.category === "shawl") {
    hashtagText.push(...shawlHashtag);
  } else if (product.category === "scarf") {
    hashtagText.push(...scarfHashtag);
  }

  const randomTags = getRandomHashtags(randomHashtagMainMil, 5);
  hashtagText.push(...randomTags);
  const hashtagTextString = hashtagText.join(" ");

  const detailsInstagram = `
${Emoje}

${title}
#${season}

#${categoryShow} : ${product?.product_name}
رنگبندی :${product?.detail_color} 
تعداد : ${product?.number_in_pack} تایی
    
قواره : ${product?.size}

قیمت : ${product?.price} تومان

${product?.person || ""}

کد : ${product?.barcode}

${hashtagTextString}`;

  const detailsTelegram = `
${Emoje}

${title}
#${season}

#${categoryShow} : ${product?.product_name}
#رنگبندی :${product?.detail_color} 
#تعداد : ${product?.number_in_pack} تایی
    
#قواره : ${product?.size}

قیمت : ${product?.price} تومان

${product?.person || ""}

#کد : ${product?.barcode}`;
  return { detailsTelegram, detailsInstagram };
};

export const copyDetailsToClipboard = (
  product: MainProduct,
  type: "telegram" | "instagram"
) => {
  const { detailsTelegram, detailsInstagram } = generateDetails(product);
  const details = type === "telegram" ? detailsTelegram : detailsInstagram;
  const textarea = document.createElement("textarea");
  textarea.value = details;
  textarea.style.position = "fixed";
  textarea.style.top = "0";
  textarea.style.left = "0";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  try {
    const copied = document.execCommand("copy");
    if (copied) {
      toast.success("جزئیات محصول کپی شد");
    } else {
      toast.error("خطا در کپی کردن جزئیات محصول");
    }
  } catch {
    toast.error("خطا در کپی کردن جزئیات محصول");
  } finally {
    document.body.removeChild(textarea);
  }
};

import { saveAs } from "file-saver";
import toast from "react-hot-toast";
const BASE_URL = process.env.NEXT_PUBLIC_IMAGE_APP_BASE_URL;

export const saveAllImages = async (product: MainProduct) => {
  try {
    const imageUrls = Object.values(product.images).map((img) => ({
      url: `${BASE_URL}${img}`,
      name: img.split("/").pop(),
    }));

    for (const { url, name } of imageUrls) {
      const response = await fetch(url);
      const blob = await response.blob();
      saveAs(blob, name);
    }

    toast.success("تمام تصاویر با نام‌های مختلف ذخیره شدند");
  } catch {
    toast.error("خطا در ذخیره تصاویر");
  }
};
