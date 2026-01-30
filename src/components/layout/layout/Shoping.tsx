// "use client";

// import Link from "next/link";
// import { HiMiniShoppingCart } from "react-icons/hi2";

// import useShoppingStore from "@/app/storeManagment/shoppingStore";
// const Shopping = () => {
//   const { cart } = useShoppingStore();
//   const cartItemsCount =
//     cart.cartItems?.reduce((acc, cur) => acc + cur.quantity, 0) || 0;

//   return (
//     <div
//       className="w-10 h-10 backdrop-blur-md bg-white/70 flex items-center justify-center rounded-full shadow-sm"
//       style={{ boxShadow: "rgb(189 189 189 / 95%) 0px 0px 10px -1px" }}
//     >
//       <Link
//         href="/preForma"
//         className="flex flex-col items-center text-sm hover:rounded-sm"
//       >
//         <div className="flex items-center gap-1">
//           <span className="pt-2">{cartItemsCount}</span>
//           <HiMiniShoppingCart />
//         </div>
//       </Link>
//     </div>
//   );
// };

// export default Shopping;
