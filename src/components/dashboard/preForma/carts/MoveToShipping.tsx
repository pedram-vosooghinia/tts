"use client";
import { useRouter } from "next/navigation";
// import { checkProductExistService } from "@/services/product/mainProduct";
// import { postPreFormaService } from "@/services/preForma";
import useShoppingStore from "@/store/shoppingStore";
// import toast from "react-hot-toast";
// import LoadingModal from "@/components/Main/LoadingModal";
// import { useState } from "react";
import { Button } from "@/components/ui/button";
const MoveToShipping = ({
  // exceptionsValue,
  // totalInvoice,
  // discountAmount,
  // marketerDiscount,
  // finalPay,
  // buyType,
}) => {
  // const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { cart, deleteAllCart } = useShoppingStore();
  const { cartItems, customer } = cart;
  // const document_id = cartItems.map((item) => item.document_id);

  // const placeOrderHandler = async () => {
  //   const orderItems = cartItems.map((item) => {
  //     const numberInPack = 
  //        parseInt(exceptionsValue[item.document_id], 10)

  //     return {
  //       product_name: item.product_name,
  //       document_id: item.document_id,
  //       number_in_pack: numberInPack,
  //       quantity: item.quantity,
  //       price: item.price,
  //       // jalali_date_chanell: item.jalali_date_chanell,
  //       // person: item.person,
  //       // sell_code: item.sell_code,
  //       // category: item.category,
  //       // image: item.images.image1,
  //     };
  //   });
  //   if (!customer) {
  //     toast.error("لطفا یک مشتری انتخاب کنید");
  //     return;
  //   }
  //   // if (!details) {
  //   //   toast.error("لطفا جزییات فاکتور را اضافه نمایید");
  //   //   return;
  //   // }
  //   try {
  //     setLoading(true);

  //     const checkData = await checkProductExistService(document_id);
  //     if (checkData && checkData.data.success) {
  //       const isQuantityValid = checkData.data.data.every((product) => {
  //         const cartItem = cartItems.find(
  //           (item) => item.document_id === product.document_id
  //         );
  //         return cartItem && cartItem.quantity <= parseInt(product.inventory);
  //       });
  //       if (isQuantityValid) {
  //         const bodyreq = JSON.stringify({
  //           order_items: orderItems,
  //           total_price: totalInvoice / 1000,
  //           status: 6,
  //           customer: customer,
  //           discount_amount: (discountAmount / 1000).toFixed(3),
  //           marketer_discount: (marketerDiscount / 1000).toFixed(3),
  //           final_pay: (finalPay / 1000).toFixed(3),
  //           buy_type: buyType,
  //         });
  //         try {
  //           const res = await postPreFormaService(bodyreq);
  //           if (res.data.status == 200) {
  //             toast.success("فاکتور با موفقیت ثبت شد");
  //             router.push("/dashboard/preForma/completed");
  //             deleteAllCart();
  //           }
  //         } catch  {
  //           toast.error("لطفا دوباره تلاش نمایید");
  //         }
  //       } else {
  //         toast.error("Quantity exceeds inventory for some items.");
  //         // const findProductLessValue = checkData.data.data.find((product) => {
  //         //   const cartItem = cartItems.find(
  //         //     (item) => item.slug === product.slug
  //         //   );
  //         //   return cartItem && cartItem.quantity > product.inventory;
  //         // });
  //         toast.error(
  //           "Product with insufficient quantity:",
  //           // findProductLessValue
  //         );
  //       }
  //     } else {
  //       toast.error(
  //         "No products available or an error occurred:",
  //         checkData.message
  //       );
  //     }
  //   } catch  {
  //     toast.error("Error handling place order:");
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  return (
    <>
      <div className="rtl flex justify-between items-center w-full px-4 mb-6">
        <Button
          className=" bg-pedram-2 text-gray-100 "
          onClick={() => router.push("/dashboard/preForma/new")}
        >
          افزودن محصول
        </Button>
        {cartItems && (
          <Button
            className="bg-pedram-1 text-gray-100 "
            // onClick={placeOrderHandler}
          >
            {/* {loading?"درحال پردازش":"ثبت سفارش اولیه"} */}
          </Button>
        )}
      </div>
    </>
  );
};

export default MoveToShipping;
