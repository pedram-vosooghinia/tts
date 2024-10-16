"use client";

import { v4 as uuidv4 } from "uuid";

export const cleanTextAddPrimery = (text: string) => {
  if (!text) {
    text = "";
  }
  const specificStringsToRemove = [":", "#"];
  const newLineKeywords = ["روسری", "شال", "قواره"];
  let cleanedText = text;

  specificStringsToRemove.forEach((str) => {
    cleanedText = cleanedText.replace(new RegExp(str, "g"), "");
  });

  cleanedText = cleanedText.replace(
    /([\u2700-\u27BF]|[\uE000-\uF8FF]|[\uD83C-\uDBFF\uDC00-\uDFFF]|\uFE0F|\uD83D[\uDE00-\uDE4F])/gu,
    ""
  );

  newLineKeywords.forEach((keyword) => {
    cleanedText = cleanedText.replace(new RegExp(`(${keyword})`, "g"), `$1\n`);
  });

  cleanedText = cleanedText
    .replace(/ \n /g, "\n")
    .replace(/ \n/g, "\n")
    .replace(/\n /g, "\n");

  return cleanedText;
};

export const prepareFormData = (
  files: FileList
): { formData: FormData; images: Record<string, string> } => {
  const formData = new FormData();
  const images: Record<string, string> = {};
  for (let i = 0; i < files.length; i++) {
    const fileExtension = files[i].name.split(".").pop();
    const uniqueName = `${uuidv4()}.${fileExtension}`;
    images[`image${i + 1}`] = uniqueName;
    formData.append(`files`, files[i], uniqueName);
  }

  return { formData, images };
};
