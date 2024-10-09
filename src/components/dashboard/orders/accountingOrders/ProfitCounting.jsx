"use client";
import React from "react";

import { Card, CardContent } from "@/components/ui/card";

const ProfitCounting = ({ item, buyPrice, handleBuyPriceChange }) => {
  return (
    <Card className="my-4">
      <CardContent className="rtl flex  flex-wrap justify-center items-center py-6">
          <div>{item?.person}</div>
          <div>{item?.sell_code}</div>
          <div className="my-4 flex justify-between items-center rtl">
            <div className="px-4 flex flex-col justify-center items-center">
              <label>قیمت خرید</label>
              <input
                name="buy_price"
                className="rounded w-24 mb-4  bg-slate-200"
                type="number"
                min={0}
                value={buyPrice || ""}
                onChange={(e) =>
                  handleBuyPriceChange(item?.barcode, Number(e.target.value))
                }
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center p-2 mb-2">
              <div className="px-2">جمع خرید</div>
              <div>
                {(
                  (buyPrice || 0) *
                  item?.number_in_pack *
                  item?.quantity *
                  1000
                ).toLocaleString()}
              </div>
            </div>
            <div className="flex justify-between items-center p-2 mb-2">
              <div className="px-2">سود</div>
              <div>
                {(
                  (item?.number_in_pack * item?.quantity * item?.price -
                    (buyPrice || 0) * item?.number_in_pack * item?.quantity) *
                  1000
                ).toLocaleString()}
              </div>
            </div>
          </div>
      </CardContent>
    </Card>
  );
};

export default ProfitCounting;
