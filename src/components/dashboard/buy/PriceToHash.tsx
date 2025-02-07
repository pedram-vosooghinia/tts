"use client";
import { useState } from "react";
import { priceToHash } from "@/utils/price/hashPrice";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription } from "@/components/ui/card";

function PriceToHash() {
  const [bulkPrice, setBulkPrice] = useState<number>(0);
  const [hashedPrice, setHashedPrice] = useState<string>("");

  const handleBulkPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setBulkPrice(value);
    setHashedPrice(priceToHash(value));
  };

  return (
    <Card>
      <CardDescription className="m-2">مخفی‌سازی قیمت عمده</CardDescription>
      <CardContent>
        <Label className="my-2">قیمت عمده:</Label>
        <Input type="number" value={bulkPrice} onChange={handleBulkPriceChange} />
        <div className="m-2">کد مخفی: {hashedPrice}</div>
      </CardContent>
    </Card>
  );
}

export default PriceToHash;
