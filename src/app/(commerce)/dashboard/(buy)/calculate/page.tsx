"use client";
import BuyCalculator from "@/components/dashboard/buy/BuyCalculator";
import ProfitCalculator from "@/components/dashboard/buy/ProfitCalculator";
import PriceToHash from "@/components/dashboard/buy/PriceToHash";
import HashToPrice from "@/components/dashboard/buy/HashToPrice";
export default function BuyCheck() {
  return (
    <div className="rtl flex justify-center flex-wrap gap-16">
      <BuyCalculator />
      <ProfitCalculator />
      <PriceToHash />
      <HashToPrice />
    </div>
  );
}
