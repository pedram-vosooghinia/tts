"use client";

import React from "react";
import { handleCopy, cleanText } from "./utils";
import { Button } from "@/components/ui/button";
interface ICopyNeedText {
  productNeedText: string;
}
const CopyNeedText = ({ productNeedText }: ICopyNeedText) => {
  return (
    <div className="bg-slate-300 w-full p-4 my-4">
      {productNeedText &&
        cleanText(productNeedText)
          .split("\n")
          .map((line: string, index: number) => (
            <div
              key={index}
              className={`flex justify-between items-center mb-6 mx-4 ${
                index % 2 === 0 ? "bg-red-300" : "bg-gray-200"
              }`}
            >
              <span>{line}</span>
              <Button
              variant="outline"
                onClick={() => handleCopy(line)}
                className={` ${
                  index % 2 === 0 ? "bg-gray-800" : "bg-slate-500"
                } text-white`}
              >
                کپی
              </Button>
            </div>
          ))}
    </div>
  );
};

export default CopyNeedText;
