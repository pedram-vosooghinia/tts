"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
const formatId = (id: string) => {
  return id.slice(-6);
};
const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);
  return {
    dateTime: date.toLocaleString("fa-IR"),
  };
};
const ProductPrice = ({ price }: { price: number }) => {
  return <span>{price.toFixed(2)} $</span>;
};
export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const router = useRouter();
  useEffect(() => {
    const storedOrder = localStorage.getItem("orderData");
    if (storedOrder) {
      const parsedOrders: Order[] = JSON.parse(storedOrder);
      setOrders(parsedOrders);
    }
  }, []);

  return (
    <div className="fcc  ">
      <div className=" fje w-full p-4 ">
        <Button variant="outline" onClick={() => router.back()}>
          بازگشت
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center w-[80px]">Id</TableHead>
            <TableHead className="text-center w-[150px]">تاریخ</TableHead>
            <TableHead className="text-center w-[120px]">جمع فاکتور</TableHead>
            <TableHead className="text-center w-[120px]">پرداخت شده</TableHead>
            <TableHead className="text-center w-[120px]">تحویل شده</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                شما هیچ سفارشی ندارید
              </TableCell>
            </TableRow>
          )}
          {orders.map((order, idx) => (
            <TableRow
              key={order.id || idx}
              className="cursor-pointer hover:bg-primary/20"
              onClick={() =>
                router.push(`/dashboard/account/orders/${order.id}`)
              }
            >
              <TableCell className="text-center">
                {formatId(order.id || String(idx))}
              </TableCell>
              <TableCell className="text-center">
                {order.createdAt
                  ? formatDateTime(order.createdAt).dateTime
                  : new Date().toLocaleDateString()}
              </TableCell>
              <TableCell className="text-center">
                <ProductPrice price={order.totalPrice} />
              </TableCell>
              <TableCell className="text-center">{`${order.isPaid}`}</TableCell>
              <TableCell className="text-center">{`${order.isDelivered}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
