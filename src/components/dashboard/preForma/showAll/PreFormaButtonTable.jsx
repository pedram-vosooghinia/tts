"use client";
import { useRouter } from "next/navigation";
Button;
import { Button } from "@/components/ui/button";
const PreFormaButtonTable = (item) => {
  const itemId = item?.item;
  const router = useRouter();
  const handlePreformaShow = (itemId) => {
    router.push(`/dashboard/preForma/edit/${itemId}`);
  };
  return <Button onClick={() => handlePreformaShow(itemId)}>ویرایش</Button>;
};

export default PreFormaButtonTable;
