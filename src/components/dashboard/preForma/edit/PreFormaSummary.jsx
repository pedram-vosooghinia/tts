import { Card, CardContent } from "@/components/ui/card";

const PreFormaSummary = ({ order }) => {
  const summaryItems = [
    { label: "جمع فاکتور:", value: order?.total_price },
    { label: "مبلغ تخفیف:", value: order?.discount_amount },
    { label: "کسر بازاریاب:", value: order?.marketer_discount },
    { label: "مبلغ واریزی:", value: order?.final_pay },
  ];

  return (
    <Card className="my-8 mx-2">
      <CardContent>
        <div className="flex flex-wrap justify-center items-center mt-4">
          {summaryItems.map((item, index) => (
            <div key={index} className="flex justify-center items-center mx-2">
              <div className="px-2">{item.label}</div>
              <div>{(item.value * 1000).toLocaleString()}</div>
              <div className="px-2"> تومان </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PreFormaSummary;
