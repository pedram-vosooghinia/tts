"use client";

import React from "react";
import { handleCopy , cleanText } from "./utils";
import { Button } from "@/components/ui/button";
const CopyNeedText = ({ productNeedText }) => {
  return (
    <div className="bg-slate-300 w-full p-4 my-4">
      {productNeedText &&
        cleanText(productNeedText)
          .split("\n")
          .map((line, index) => (
            <div
              key={index}
              className={`flex justify-between items-center mb-6 mx-4 ${
                index % 2 === 0 ? "bg-purple-300" : "bg-gray-200"
              }`}
            >
              <span>{line}</span>
              <Button
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
