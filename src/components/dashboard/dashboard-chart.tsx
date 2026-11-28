"use client";

export interface DashboardChartPoint {
  label: string;
  value: number;
}

interface DashboardChartProps {
  data?: DashboardChartPoint[];
  unit?: string;
}

const defaultData: DashboardChartPoint[] = [
  { label: "محصولات", value: 0 },
  { label: "دسته‌بندی‌ها", value: 0 },
  { label: "سفارش‌ها", value: 0 },
  { label: "کاربران", value: 0 },
  { label: "پروژه‌ها", value: 0 },
  { label: "وظایف", value: 0 },
  { label: "تیکت‌ها", value: 0 },
];

export function DashboardChart({
  data = defaultData,
  unit = "مورد",
}: DashboardChartProps) {
  const max = Math.max(...data.map((item) => item.value), 1);

  return (
    <div className="flex h-[260px] w-full flex-col justify-between gap-4 pt-2">
      <div className="flex flex-1 items-end gap-3 sm:gap-5">
        {data.map((item) => {
          const heightPercent = Math.max(
            item.value > 0 ? Math.round((item.value / max) * 100) : 6,
            6,
          );

          return (
            <div
              key={item.label}
              className="group flex h-full flex-1 flex-col items-center justify-end gap-2"
            >
              <span className="text-[11px] font-semibold tabular-nums text-muted-foreground transition-colors group-hover:text-primary">
                {item.value.toLocaleString("fa-IR")}
              </span>

              <div className="relative flex h-full w-full max-w-[44px] items-end rounded-xl bg-[#F5F3F9] p-1">
                <div
                  style={{ height: `${heightPercent}%` }}
                  title={`${item.label}: ${item.value.toLocaleString("fa-IR")} ${unit}`}
                  className="w-full rounded-lg bg-gradient-to-t from-primary to-primary/70 transition-all duration-500 group-hover:from-primary group-hover:to-primary/90"
                />
              </div>

              <span className="line-clamp-1 text-center text-[11px] text-[#777485]">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
