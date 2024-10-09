"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
const CompleteOrderButtonTable = (item) => {
  const itemId = item?.item?.id;
  const router = useRouter();
  const handleCompleteShow = (itemId) => {
    router.push(`/dashboard/orders/compeleteOrders/${itemId}`);
  };
  return <Button onClick={() => handleCompleteShow(itemId)}>مشاهده</Button>;
};

export default CompleteOrderButtonTable;
