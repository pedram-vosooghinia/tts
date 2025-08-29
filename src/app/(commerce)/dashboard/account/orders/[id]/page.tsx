"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString("fa-IR");
};

export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const storedOrders = localStorage.getItem("orderData");
    if (storedOrders) {
      const parsedOrders: Order[] = JSON.parse(storedOrders);
      const foundOrder = parsedOrders.find((o) => o.id === id);
      if (foundOrder) setOrder(foundOrder);
    }
  }, [id]);

  if (!order) {
    return <p className="p-4 text-center">سفارشی یافت نشد</p>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">جزئیات سفارش</h1>
        <Button variant="outline" onClick={() => router.push("/dashboard/account/orders")}>
          بازگشت
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>اطلاعات سفارش</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-2">
          <p>
            <strong>شماره سفارش:</strong> {order.id}
          </p>
          <p>
            <strong>تاریخ:</strong> {formatDateTime(order.createdAt)}
          </p>
          <p>
            <strong>جمع کل:</strong> {order.totalPrice.toFixed(2)} $
          </p>
 <p>
  <strong>پرداخت شده:</strong>{" "}
  <span
    className={`px-2 py-1 rounded-full text-xs font-semibold ${
      order.isPaid
        ? "bg-green-100 text-green-700"
        : "bg-red-100 text-red-700"
    }`}
  >
    {order.isPaid ? "بله" : "خیر"}
  </span>
</p>

<p>
  <strong>تحویل شده:</strong>{" "}
  <span
    className={`px-2 py-1 rounded-full text-xs font-semibold ${
      order.isDelivered
        ? "bg-blue-100 text-blue-700"
        : "bg-gray-200 text-gray-700"
    }`}
  >
    {order.isDelivered ? "بله" : "خیر"}
  </span>
</p>

        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>محصولات</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">نام محصول</TableHead>
                <TableHead className="text-center">تعداد</TableHead>
                <TableHead className="text-center">قیمت واحد</TableHead>
                <TableHead className="text-center">جمع</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.order_items.map((item) => (
                <TableRow key={item.document_id}>
                  <TableCell className="text-center">
                    {item.product_title}
                  </TableCell>
                  <TableCell className="text-center">
                    {item.quantity}
                  </TableCell>
                  <TableCell className="text-center">
                    {item.price.toFixed(2)} $
                  </TableCell>
                  <TableCell className="text-center">
                    {(item.quantity * item.price).toFixed(2)} $
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
