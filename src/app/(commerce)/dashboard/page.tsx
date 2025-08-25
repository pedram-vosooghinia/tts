"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeModal, setActiveModal] = useState<number | null>(null);

  useEffect(() => {
    const storedOrder = localStorage.getItem("orderData");
    if (storedOrder) {
      const parsedOrders: Order[] = JSON.parse(storedOrder);
      setOrders(parsedOrders);
    }
  }, []);
  console.log("orders", orders);
  const openModal = (index: number) => setActiveModal(index);
  const closeModal = () => setActiveModal(null);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">داشبورد سفارشات</h1>
      {orders.length === 0 ? (
        <div className="text-center mt-8">هیچ سفارشی وجود ندارد</div>
      ) : (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">شماره سفارش</TableHead>
                <TableHead className="text-center">تعداد محصولات</TableHead>
                <TableHead className="text-center">قیمت کل</TableHead>
                <TableHead className="text-center">تاریخ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order, idx) => (
                <TableRow
                  key={idx}
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => openModal(idx)}
                >
                  <TableCell className="text-center">{idx + 1}</TableCell>
                  <TableCell className="text-center">
                    {order.order_items.reduce((acc, i) => acc + i.quantity, 0)}
                  </TableCell>
                  <TableCell className="text-center">
                    {order.total_price}
                  </TableCell>
                  <TableCell className="text-center">
                    {order.date || new Date().toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {activeModal !== null && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <Card className="w-11/12 md:w-2/3 lg:w-1/2 max-h-[80vh] overflow-y-auto">
                <CardContent className="flex flex-col">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold">
                      محصولات سفارش #{activeModal + 1}
                    </h2>
                    <Button
                      onClick={closeModal}
                      className="bg-red-500 text-white p-1 rounded w-8 h-8 m-4"
                    >
                      ×
                    </Button>
                  </div>
                  <div className="flex flex-col gap-2">
                    {orders[activeModal].order_items.map((item, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center border-b py-2"
                      >
                        <div className="truncate max-w-xs">
                          {item.product_title}
                        </div>
                        <div>تعداد: {item.quantity}</div>
                        <div>قیمت: {item.price} $</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}{" "}
        </>
      )}
    </div>
  );
};

export default Dashboard;
