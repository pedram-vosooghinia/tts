import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const orders = [
  {
    id: "#1024",
    customer: "علی محمدی",
    product: "کفش اسپرت",
    amount: "۲,۵۰۰,۰۰۰",
    status: "در حال پردازش",
    color: "bg-amber-50 text-amber-600",
  },
  {
    id: "#1023",
    customer: "سارا احمدی",
    product: "کیف دستی",
    amount: "۱,۸۰۰,۰۰۰",
    status: "تکمیل شده",
    color: "bg-green-50 text-green-600",
  },
  {
    id: "#1022",
    customer: "رضا کریمی",
    product: "ساعت مچی",
    amount: "۳,۲۰۰,۰۰۰",
    status: "در انتظار",
    color: "bg-blue-50 text-blue-600",
  },
  {
    id: "#1021",
    customer: "مریم حسینی",
    product: "عینک آفتابی",
    amount: "۹۵۰,۰۰۰",
    status: "لغو شده",
    color: "bg-red-50 text-red-500",
  },
];

export function RecentOrders() {
  return (
    <section className="overflow-hidden rounded-2xl border border-[#ECE9F2] bg-white">
      <div className="flex items-center justify-between border-b border-[#F0EDF4] p-5">
        <div>
          <h2 className="font-bold">آخرین سفارش‌ها</h2>
          <p className="mt-1 text-xs text-[#9995A5]">
            آخرین تراکنش‌های فروشگاه
          </p>
        </div>

        <Link
          href="/dashboard/orders"
          className="flex items-center gap-2 text-xs font-semibold text-[#7950D8] hover:underline"
        >
          مشاهده همه
          <ArrowLeft size={14} />
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[650px] text-right text-sm">
          <thead className="bg-[#FAF9FC] text-xs text-[#9995A5]">
            <tr>
              <th className="px-5 py-4 font-medium">شماره سفارش</th>
              <th className="px-5 py-4 font-medium">مشتری</th>
              <th className="px-5 py-4 font-medium">محصول</th>
              <th className="px-5 py-4 font-medium">مبلغ</th>
              <th className="px-5 py-4 font-medium">وضعیت</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#F3F0F6]">
            {orders.map((order) => (
              <tr key={order.id} className="transition hover:bg-[#FAF9FC]">
                <td className="px-5 py-4 font-semibold text-[#7950D8]">
                  {order.id}
                </td>
                <td className="px-5 py-4">{order.customer}</td>
                <td className="px-5 py-4 text-[#777485]">
                  {order.product}
                </td>
                <td className="px-5 py-4 font-medium">
                  {order.amount} تومان
                </td>
                <td className="px-5 py-4">
                  <span
                    className={`inline-flex rounded-lg px-3 py-1.5 text-[11px] font-semibold ${order.color}`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
