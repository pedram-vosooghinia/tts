"use client";
import { useState } from "react";
import { priceToHash } from "@/utils/price/hashPrice";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
function PriceToHash() {
  const [bulkPrice, setBulkPrice] = useState<number>(0);
  const [bulkPercent, setBulkPercent] = useState<number>(0);
  const [hashedPrice, setHashedPrice] = useState<string>("");

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<number>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseFloat(e.target.value) || 0;
      setter(value);
    };

  const generateHash = () => {
    setHashedPrice(priceToHash(bulkPrice, bulkPercent));
  };

  const copyToClipboard = async () => {
    if (hashedPrice) {
      await navigator.clipboard.writeText(hashedPrice);
      toast.success("کد مخفی کپی شد!");
    }
  };

  return (
    <Card>
      <CardDescription className="m-2">مخفی‌سازی قیمت عمده</CardDescription>
      <CardContent>
        <Label className="my-2">قیمت عمده:</Label>
        <Input type="number" value={bulkPrice} onChange={handleInputChange(setBulkPrice)} />

        <Label className="my-2">درصد تک:</Label>
        <Input type="number" value={bulkPercent} onChange={handleInputChange(setBulkPercent)} />

        <Button className="my-2 w-full bg-blue-500" onClick={generateHash}>
          تولید هش
        </Button>

        {hashedPrice && (
          <div className="m-2 flex items-center gap-2">
            <span className="bg-gray-100 px-2 py-1 rounded">{hashedPrice}</span>
            <Button className="bg-green-500" onClick={copyToClipboard}>
              کپی
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default PriceToHash;
