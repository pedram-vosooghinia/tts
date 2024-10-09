"use client";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
const AcountingOrderButtonTable = (item) => {
  const itemId = item?.item?.id;
  const router = useRouter();
  const handleAccounting = (itemId) => {
    router.push(`/dashboard/orders/accountingOrders/${itemId}`);
  };
  return <Button onClick={() => handleAccounting(itemId)}>حسابداری</Button>;
};

export default AcountingOrderButtonTable;
