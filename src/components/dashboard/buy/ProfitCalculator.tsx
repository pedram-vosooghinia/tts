"use client";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription } from "@/components/ui/card";

function ProfitCalculator() {
  const [buy, setBuy] = useState<number>(0);
  const [sell, setSell] = useState<number>(0);
  const [values, setValues] = useState<{ percent: number; justVN: number } | null>(null);

  const calculateProfit = (inputBuy: number, inputSell: number) => {
    if (inputBuy > 0 && inputSell > 0) { 
      const percent = (inputSell / inputBuy - 1) * 100;
      const justVN = inputSell - inputBuy;
      setValues({ percent, justVN });
    } else {
      setValues(null);
    }
  };

  const handleBuyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setBuy(value);
    calculateProfit(value, sell);
  };

  const handleSellChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setSell(value);
    calculateProfit(buy, value);
  };

  return (
    <Card>
      <CardDescription className="m-2">محاسبه سود</CardDescription>
      <CardContent>
        <Label className="my-2">قیمت فروش:</Label>
        <Input type="number" value={sell} onChange={handleSellChange} />
        <Label className="my-2">قیمت خرید:</Label>
        <Input type="number" value={buy} onChange={handleBuyChange} />
        {values && (
          <>
            <div className="m-2">درصد سود: {values.percent.toFixed(2)}%</div>
            <div className="m-2">سود ناخالص: {values.justVN.toFixed(2)}</div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default ProfitCalculator;
