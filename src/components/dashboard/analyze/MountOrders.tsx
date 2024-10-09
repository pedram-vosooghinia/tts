"use client";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import lodash from "lodash"

import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts";

import { CardDescription,  CardHeader } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";

const MountOrders :React.FC<MountOrdersProps>= ({ data, month }) => {
  const totalClearProfit = lodash.sumBy(data, (order) =>
    parseFloat(order.clear_profit)
  );
  const totalValue = lodash.sumBy(data, (order) =>
    parseFloat(order.total_value)
  );
  const firstPay = lodash.sumBy(data, (order) => parseFloat(order.final_pay));
  const realPrice = lodash.sumBy(data, (order) =>
    parseFloat(order.total_price)
  );
  const totalDiscountAmount = lodash.sumBy(data, (order) =>
    parseFloat(order.discount_amount)
  );
  const totalMarketerDiscount = lodash.sumBy(data, (order) =>
    parseFloat(order.marketer_discount)
  );

  const profitToMarketerRatio = totalClearProfit / totalMarketerDiscount || 0;
  const profitToRealPriceRatio = (totalClearProfit / realPrice) * 100 || 0;
  const profitToFirdtPriceRatio = (totalClearProfit / firstPay) * 100 || 0;

  return (
    <div className="flex justify-center items-center  px-4 w-full">
      <Card className="w-full my-6">
        <CardTitle className="m-4 text-2xl font-bold">خلاصه برج{`  ${month}`}</CardTitle>
        <CardContent className="flex flex-wrap justify-center items-center gap-4">
          <Card className="flex flex-col items-center">
            <CardTitle className="m-4">تعداد فاکتور</CardTitle>
            <CardContent>{data?.length}</CardContent>
          </Card>
          <Card className="flex flex-col items-center">
            <CardTitle className="m-4">سود ما</CardTitle>
            <CardContent>{totalClearProfit.toFixed(0)} تومان</CardContent>
          </Card>
          <Card className="flex flex-col items-center">
            <CardTitle className="m-4">تعداد کار</CardTitle>
            <CardContent>{totalValue} عدد</CardContent>
          </Card>
          <Card className="flex flex-col items-center">
            <CardTitle className="m-4">مبلغ اصلی</CardTitle>
            <CardContent>{firstPay.toFixed(0)} تومان</CardContent>
          </Card>
          <Card className="flex flex-col items-center">
            <CardTitle className="m-4">مبلغ دریافتی</CardTitle>
            <CardContent>{realPrice.toFixed(0)} تومان</CardContent>
          </Card>
          <Card className="flex flex-col items-center">
            <CardTitle className="m-4">مبلغ تخفیف</CardTitle>
            <CardContent>{totalDiscountAmount.toFixed(2)} تومان</CardContent>
          </Card>
          <Card className="flex flex-col items-center">
            <CardTitle className="m-4">سود بازاریاب</CardTitle>
            <CardContent>{totalMarketerDiscount.toFixed(2)} تومان</CardContent>
          </Card>

          <Card className=" w-full  px-4">
            <CardHeader>
              <CardDescription className=" text-sm">نسبت‌ها</CardDescription>
              <CardTitle className="text-2xl font-bold">
                برج {`${month}`}
              </CardTitle>
            </CardHeader>
            <CardContent className="ltr ">
              <ChartContainer
                className="w-full h-64"
                config={{
                  profitToMarketer: {
                    color: "hsl(var(--chart-1))",
                  },
                  profitToTotalPrice: {
                    color: "hsl(var(--chart-2))",
                  },
                  profitToFirdtPriceRatio: {
                    color: "hsl(var(--chart-3))",
                  },
                }}
              >
                <BarChart
                  margin={{
                    top: 10,
                    bottom: 20,
                  }}
                  data={[
                    {
                      activity: "سود ما به بازاریاب",
                      value: profitToMarketerRatio * 100,
                      label: `${profitToMarketerRatio.toFixed(2)}برابر`,
                      fill: "var(--color-profitToMarketer)",
                    },
                    {
                      activity: "درصد سود واقعی",
                      value: profitToRealPriceRatio * 100,
                      label: `${profitToRealPriceRatio.toFixed(2)}%`,
                      fill: "var(--color-profitToTotalPrice)",
                    },
                    {
                      activity: "درصد سوداولیه",
                      value: profitToFirdtPriceRatio * 100,
                      label: `${profitToFirdtPriceRatio.toFixed(2)}%`,
                      fill: "var(--color-profitToFirdtPriceRatio)",
                    },
                  ]}
                  layout="vertical"
                  barSize={40}
                  barGap={5}
                >
                  <XAxis type="number" dataKey="value" hide />
                  <YAxis
                    dataKey="activity"
                    type="category"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                    className=""
                    padding={{
                      top: 10,
                      bottom: 20,
                    }}
                  />
                  <Bar dataKey="value" radius={8} fillOpacity={0.9}>
                    <LabelList
                      position="insideLeft"
                      dataKey="label"
                      fill="white"
                      fontSize={14}
                      className="font-semibold"
                    />
                  </Bar>
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default MountOrders;
