"use client";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription } from "@/components/ui/card";

function BuyCalculator() {
  const [buy, setBuy] = useState<number>(0);
  const [percent, setPercent] = useState<number>(0);
  const [values, setValues] = useState<{ sell: number; justVN: number } | null>(null);

  const calculateValues = (inputBuy: number, inputPercent: number) => {
    if (!isNaN(inputBuy) && !isNaN(inputPercent)) {
      const sell = inputBuy * (1 + inputPercent / 100);
      const justVN = sell - inputBuy;
      setValues({ sell, justVN });
    } else {
      setValues(null);
    }
  };

  const handleBuyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setBuy(value);
    calculateValues(value, percent);
  };

  const handlePercentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setPercent(value);
    calculateValues(buy, value);
  };

  return (
    <Card>
      <CardDescription className="m-2">محاسبه قیمت کانال</CardDescription>
      <CardContent>
        <Label className="my-2">قیمت خرید:</Label>
        <Input type="number" value={buy} onChange={handleBuyChange} />
        <Label className="my-2">درصد:</Label>
        <Input type="number" value={percent} onChange={handlePercentChange} />
        {values && (
          <>
            <div className="m-2">قیمت فروش: {values.sell.toFixed(2)}</div>
            <div className="m-2">سود ناخالص: {values.justVN.toFixed(2)}</div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default BuyCalculator;
