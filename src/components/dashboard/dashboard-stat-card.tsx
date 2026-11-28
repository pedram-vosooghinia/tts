import type { LucideIcon } from "lucide-react";
import { ArrowDownLeft, ArrowUpLeft } from "lucide-react";

interface DashboardStatCardProps {
  title: string;
  value: string;
  change: string;
  positive?: boolean;
  icon: LucideIcon;
}

export function DashboardStatCard({
  title,
  value,
  change,
  positive = true,
  icon: Icon,
}: DashboardStatCardProps) {
  return (
    <div className="rounded-2xl border border-[#ECE9F2] bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#7950D8]/5">
      <div className="flex items-center justify-between">
        <div className="flex size-11 items-center justify-center rounded-xl bg-primary/20 text-primary">
          <Icon size={21} strokeWidth={1.8} />
        </div>

        {/* <span
          className={`flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-semibold ${
            positive ? "bg-primary/20 text-primary" : "bg-red-50 text-red-500"
          }`}
        >
          {positive ? <ArrowUpLeft size={13} /> : <ArrowDownLeft size={13} />}
          {change}
        </span> */}
      </div>

      <p className="mt-5 text-sm text-[#8B8797]">{title}</p>
      <h3 className="mt-2 text-2xl font-bold tracking-tight text-[#282535]">
        {value}
      </h3>
    </div>
  );
}
