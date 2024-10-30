"use client";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import lodash from "lodash"


import { CardDescription,  CardHeader } from "@/components/ui/card";

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
       
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default MountOrders;
