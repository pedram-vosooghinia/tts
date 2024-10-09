// "use client";
// import Image from "next/image";
// import { useState, useEffect } from "react";

// const AllImage = ({ product, sameSize }) => {
//   const [sameSizeImage, setSameSizeImage] = useState(false);
//   const BASE_URL = process.env.NEXT_PUBLIC_IMAGE_APP_BASE_URL;
//   useEffect(() => {
//     setSameSizeImage(sameSize);
//   }, [sameSize]);
//   return (
//     <div className="flex flex-col items-center">
//       {sameSizeImage ? (
//         <div className="flex w-full flex-wrap md:mt-10 mt-10 justify-center items-center">
//           {product && (
//             <div className="flex flex-wrap m-auto justify-center ">
//               {product.images &&
//                 Object.keys(product.images).map((key, index) => (
//                   <Image
//                     key={index}
//                     src={`${BASE_URL}${product.images[key]}`}
//                     alt={`Image ${index + 1}`}
//                     className="rounded-xl m-2 w-36"
//                     width={120}
//                     height={80}
//                     priority={true}
//                     style={{ width: "auto", height: "auto" }}
//                   />
//                 ))}
//             </div>
//           )}
//         </div>
//       ) : (
//         <div className="flex flex-col items-center mt-4 ">
//           <Image
//             src={`${BASE_URL}${product.images.image1}`}
//             alt={product.product_name || `Image 1`}
//             className="rounded px-2"
//             width={300}
//             height={300}
//             priority={true}
//             style={{ width: "auto", height: "auto" }}
//           />
//           <div className="flex flex-wrap justify-center mt-4">
//             {Object.values(product.images).map(
//               (img, index) =>
//                 index !== 0 && (
//                   <div key={index} className=" m-1">
//                     <Image
//                       src={`${BASE_URL}${img}`}
//                       alt={`${product.product_name}`}
//                       width={70}
//                       height={70}
//                       className="rounded object-cover"
//                       style={{ width: "auto", height: "auto" }}
//                     />
//                   </div>
//                 )
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AllImage;
