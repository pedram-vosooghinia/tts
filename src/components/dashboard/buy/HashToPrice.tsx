"use client";
import { useState } from "react";
import { hashToPrice } from "@/utils/price/hashPrice";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription } from "@/components/ui/card";

function HashToPrice() {
  const [hashedPrice, setHashedPrice] = useState<string>("");
  const [decodedPrice, setDecodedPrice] = useState<number | null>(null);

  const handleHashedPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setHashedPrice(value);
    setDecodedPrice(hashToPrice(value));
  };

  return (
    <Card>
      <CardDescription className="m-2">بازگردانی قیمت</CardDescription>
      <CardContent>
        <Label className="my-2">کد مخفی:</Label>
        <Input type="text" value={hashedPrice} onChange={handleHashedPriceChange} />
        {decodedPrice !== null && <div className="m-2">قیمت اصلی: {decodedPrice}</div>}
      </CardContent>
    </Card>
  );
}

export default HashToPrice;
