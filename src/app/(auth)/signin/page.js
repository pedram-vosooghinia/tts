// "use client";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { signinServices } from "@/services/auth";
// import { Button } from "@/components/ui/button";
// import toast from "react-hot-toast";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// export default function Signin() {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const router = useRouter();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm();

//   async function submitHandler({
//     firstName,
//     lastName,
//     phoneNumber,
//     password,
//     address,
//   }) {
//     setIsSubmitting(true)
//     const values = { firstName, lastName, phoneNumber, password, address };
//     signinServices(values)
//     .then((res) => {
//       toast.success(
//         "شما با موفقیت ثبت نام کرده اید، لطفا منتظر تایید مدیریت باشید"
//       );
//       reset();
//     })
//     .catch((e) => {
//       toast.error(e.response.data.message);
//     });
//     setIsSubmitting(true)
//   }

//   return (
//     <>
//       <div className=" mx-auto grid w-[350px] gap-6 py-12">
//         <h1 className="text-3xl font-bold text-center">Sign In</h1>
//         <form onSubmit={handleSubmit(submitHandler)}>
//           <div className="grid gap-4">
//             <div className="grid gap-2">
//               <Label htmlFor="mobile">نام</Label>
//               <Input
//                 {...register("firstName", { required: true })}
//                 type="text"
//                 id="firstName"
//                 autoFocus
//               />
//               {errors.firstName && (
//                 <div className="text-red-500">نام را وارد کنید</div>
//               )}
//             </div>
//             <div className="grid gap-2">
//               <Label htmlFor="mobile">نام خانوادگی</Label>
//               <Input
//                 {...register("lastName", { required: true })}
//                 type="text"
//                 id="lastName"
//                 placeholder=""
//               />
//               {errors.lastName && (
//                 <div className="text-red-500">نام خانوادگی را وارد کنید</div>
//               )}
//             </div>
//             <div className="grid gap-2">
//               <Label htmlFor="mobile">آدرس</Label>
//               <Input
//                 {...register("address", { required: true })}
//                 type="text"
//                 id="address"
//               />
//               {errors.lastName && (
//                 <div className="text-red-500">آدرس را وارد کنید</div>
//               )}
//             </div>
//             <div className="grid gap-2">
//               <Label htmlFor="mobile">موبایل</Label>
//               <Input
//                 {...register("phoneNumber", {
//                   required: true,
//                   pattern: /^[0-9]{10}$/i,
//                 })}
//                 type="tel"
//                 id="phoneNumber"
//                 placeholder="9001234567"
//                 className="rtl"
//               />
//               {errors.phoneNumber && (
//                 <div className="text-red-500">
//                   لطفاً شماره تماس را بدون صفر وارد کنید
//                 </div>
//               )}
//             </div>
//             <div className="grid gap-2">
//               <Label htmlFor="mobile">رمز ورود</Label>
//               <Input
//                 {...register("password", {
//                   required: true,
//                 })}
//                 type="password"
//                 id="password"
//               />
//             </div>
//             {errors.password && (
//               <div className="text-red-500">
//                 رمز ورود باید حداقل 8 کاراکتر باشد و شامل یک حرف بزرگ، یک حرف
//                 کوچک و یکی از !@#$%^ باشد
//               </div>
//             )}

//             <Button
//               type="submit"
//               className={`  ${
//                 isSubmitting ? "opacity-50 cursor-not-allowed" : ""
//               }`}
//               disabled={isSubmitting}
//             >
//               {isSubmitting ? "در حال ثبت نام..." : "ثبت نام"}
//             </Button>
//           </div>
//         </form>
//         <Button variant="outline" onClick={() => router.push("./")}>
//           بازگشت
//         </Button>
//       </div>
//     </>
//   );
// }
