"use client";
import OneImage from "@/components/Main/OneImage";
import { Card, CardContent } from "@/components/ui/card";
const ShowProductPreForma = ({ product }) => {
  const items = [
    { title: "barcode", content: "کد محصول" },
    { title: "number_in_pack", content: "تعداد در بسته" },
    { title: "quantity", content: "تعداد جین" },
    { title: "totalValue", content: "تعداد کل" },
    { title: "price", content: "قیمت تک" },
    { title: "totalPrice", content: "قیمت کل" },
  ];
  return (
    <Card>
      <CardContent>
        <div className="flex flex-col justify-center items-center ">
          <OneImage product={product} size={100} justOneImage={true} />
          <div className="flex flex-col justify-between items-center w-full rtl ">
            <div className="font-bold text-xl mb-2">
              {product?.product_name}
            </div>
            {items.map((item, index) => (
              <div
                className="flex justify-between w-full items-center p-2"
                key={index}
              >
                <div className="px-2">{item.content}</div>
                {item.title === "totalPrice" ? (
                  <div>
                    {(
                      product?.price *
                      product?.quantity *
                      product?.number_in_pack *
                      1000
                    ).toLocaleString()}
                  </div>
                ) : item.title === "price" ? (
                  <div>{(product?.price * 1000).toLocaleString()}</div>
                ) : item.title === "totalValue" ? (
                  <div>
                    {(
                      product?.quantity * product?.number_in_pack
                    ).toLocaleString()}
                  </div>
                ) : item.title === "number_in_pack" ? (
                  <div>{product?.number_in_pack}</div>
                ) : (
                  <div>{product?.[item.title]}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShowProductPreForma;
