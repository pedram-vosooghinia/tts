"use client";

import React from "react";
import { useState } from "react";
import { items } from "./items";
import useUserStore from "@/store/userStore";
import { generateDetails } from "./utils";
const ProductDescription = ({ product }) => {
  const { user } = useUserStore();
  const [showDescription, setShowDescription] = useState(false);
  const handleShow = () => {
    setShowDescription(!showDescription);
  };
  const details = generateDetails(product);
  const detailsTelegram = details.detailsTelegram.split("\n"); // Split by line breaks
  return (
    <div className="px-2 flex-col flex-wrap justify-between w-full shadow-lg my-4 rtl">
      <button
        onClick={handleShow}
        style={{
          backgroundColor: showDescription ? "#840032" : "#B2BD7E",
          color: showDescription ? "#FFF9FB" : "black",
        }}
        className="flex mx-auto rounded-md text-xm m-2 p-3"
      >
        توضیحات
      </button>

      {user?.role === "cto" && showDescription && (
        <div className="w-full">
          {items.map((item, index) => {
            if (item.title === "detail_color" && !product.detail_color) {
              return null;
            }
            return (
              <div
                className="flex justify-between text-gray-700 font-bold py-2"
                key={index}
              >
                <div className="flex justify-between items-center rtl pl-8">
                  {item.content}
                </div>
                {item.title === "category" || item.title === "season" ? (
                  <div>
                    {item.options.map((option) => {
                      if (product[item.title] === option.value) {
                        return option.label;
                      }
                      return null;
                    })}
                  </div>
                ) : (
                  <div>{product?.[item.title]}</div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {user?.role === "manager" && showDescription && (
        <div className="w-full">
          {detailsTelegram.map((line, index) => (
            <div
              key={index}
              className="flex justify-between text-gray-700 font-bold py-2"
            >
              <div>{line}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductDescription;
