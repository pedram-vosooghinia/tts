"use client";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription } from "@/components/ui/card";

function BuyCheck() {
  const [buy, setBuy] = useState<number>(0);
  const [percent, setPercent] = useState<number>(0);
  const [values, setValues] = useState<{
    sell: number;
    marketer: number;
    justVN: number;
    pureWithoutMarketer: number;
  } | null>(null);
  const [buy2, setBuy2] = useState<number>(0);
  const [sell2, setSell2] = useState<number>(0);
  const [values2, setValues2] = useState<{
    percent2: number;
    marketer2: number;
    justVN2: number;
    pureWithoutMarketer2: number;
  } | null>(null);

  const calculateValues = (inputBuy: number, inputPercent: number) => {
    const inputNumber = inputBuy;
    const percentNumber = inputPercent;
    if (!isNaN(inputNumber) && !isNaN(percentNumber)) {
      const sell = inputNumber * (1 + percentNumber / 100);
      const marketer = sell * 0.07;
      const justVN = sell - inputNumber;
      const pureWithoutMarketer = justVN - marketer;
      setValues({ sell, marketer, justVN, pureWithoutMarketer });
    } else {
      setValues(null);
    }
  };

  const calculateProfit = (inputBuy: number, inputSell: number) => {
    const inputBuyNum = inputBuy;
    const inputSellNum = inputSell;
    if (!isNaN(inputBuyNum) && !isNaN(inputSellNum)) {
      const percent2 = (inputSellNum / inputBuyNum - 1) * 100;
      const marketer2 = inputSellNum * 0.07;
      const justVN2 = inputSellNum - inputBuyNum;
      const pureWithoutMarketer2 = justVN2 - marketer2;
      setValues2({ percent2, marketer2, justVN2, pureWithoutMarketer2 });
    } else {
      setValues2(null);
    }
  };
  const handleBuyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setBuy(value);
    calculateValues(value, percent);
  };

  const handlePercentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setPercent(value);
    calculateValues(buy, value);
  };

  const handleBuy2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setBuy2(value);
    calculateProfit(value, sell2);
  };

  const handleSell2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setSell2(value);
    calculateProfit(buy2, value);
  };

  return (
    <div className="rtl flex justify-center flex-wrap gap-16">
      <Card>
        <CardDescription className="m-2">محاسبه قیمت کانال</CardDescription>
        <CardContent>
          <Label className="my-2">قیمت خرید:</Label>
          <Input type="number" value={buy} onChange={handleBuyChange} />
          <Label className="my-2">درصد:</Label>
          <Input type="number" value={percent} onChange={handlePercentChange} />
          {values && (
            <>
              <>
                <div className="m-2">قیمت فروش: {values.sell.toFixed(2)}</div>
                <div className="m-2">
                  سود ناخالص1: {values.justVN.toFixed(2)}
                </div>
                <div className="m-2">
                  سود مشتری: {values.marketer.toFixed(2)}
                </div>
                <div className="m-2">
                  سود ناخالص2: {values.pureWithoutMarketer.toFixed(2)}
                </div>
              </>
            </>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardDescription className="m-2">محاسبه سود</CardDescription>
        <CardContent>
          <Label className="my-2">قیمت فروش:</Label>
          <Input type="number" value={sell2} onChange={handleSell2Change} />
          <Label className="my-2">قیمت خرید:</Label>
          <Input type="number" value={buy2} onChange={handleBuy2Change} />
          {values2 && (
            <>
              <div className="m-2">درصد سود: {values2.percent2.toFixed(2)}</div>
              <div className="m-2">
                سود ناخالص: {values2.justVN2.toFixed(2)}
              </div>
              <div className="m-2">
                سود مشتری: {values2.marketer2.toFixed(2)}
              </div>
              <div className="m-2">
                سود ناخالص2: {values2.pureWithoutMarketer2.toFixed(2)}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default BuyCheck;
