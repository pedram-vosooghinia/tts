"use client";

import { useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";

import BreadcrumbMain from "@/components/shared/BreadcrumbMain";
import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CreateOrderDialog from "@/features/orders/components/CreateOrderDialog";
import DashboardOrdersTable from "@/features/orders/components/DashboardOrdersTable";
import OrderDetailsDialog from "@/features/orders/components/OrderDetailsDialog";
import { orderStatusOptions } from "@/features/orders/constants/order.constants";
import { useOrders } from "@/features/orders/hooks/useOrders";

export default function DashboardOrdersPage() {
  const { orders, isLoading } = useOrders();
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [lookupId, setLookupId] = useState<string>("");
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const filteredOrders = useMemo(() => {
    if (statusFilter === "all") return orders;
    return orders.filter((order) => order.status === statusFilter);
  }, [orders, statusFilter]);

  const handleOpenOrder = (id: number) => {
    setSelectedOrderId(id);
    setDetailsOpen(true);
  };

  const handleLookupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = Number(lookupId.trim());
    if (Number.isFinite(id) && id > 0) {
      handleOpenOrder(id);
    }
  };

  return (
    <div className="space-y-6">
      <BreadcrumbMain
        items={[
          { label: "داشبورد", href: "/dashboard" },
          { label: "سفارش‌ها" },
        ]}
      />

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <PageHeader
          title="مدیریت سفارش‌ها"
          description="مشاهده سفارش‌ها، پیگیری با شناسه سفارش و تغییر وضعیت"
        />

        <CreateOrderDialog>
          <Button>
            <Plus className="ml-2 h-4 w-4" />
            ثبت سفارش جدید
          </Button>
        </CreateOrderDialog>
      </div>

      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <form
          onSubmit={handleLookupSubmit}
          className="flex w-full max-w-sm items-center gap-2"
        >
          <Input
            dir="ltr"
            type="number"
            min={1}
            placeholder="جستجو و مدیریت با شناسه سفارش (مثلاً 1)"
            value={lookupId}
            onChange={(e) => setLookupId(e.target.value)}
            className="bg-white text-right"
          />
          <Button type="submit" variant="outline" className="shrink-0">
            <Search className="ml-1.5 h-4 w-4" />
            مشاهده
          </Button>
        </form>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-50 bg-white">
            <SelectValue placeholder="وضعیت سفارش" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">همه وضعیت‌ها</SelectItem>
            {orderStatusOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <DashboardOrdersTable
        orders={filteredOrders}
        isLoading={isLoading}
        onView={handleOpenOrder}
      />

      <OrderDetailsDialog
        orderId={selectedOrderId}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      />
    </div>
  );
}
