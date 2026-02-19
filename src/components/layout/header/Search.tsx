// import { useState, useRef, useEffect } from "react";
// import Image from "next/image";
// import { FaX } from "react-icons/fa6";

// import Link from "next/link";
// import toast from "react-hot-toast";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { FreeMode } from "swiper/modules";

// const CATEGORY_CONFIG = {
//   product: { title: "محصولات", icon: "🛍️", link: "business/product" },
// };

// const HISTORY_KEY = "user_search_history";

// // --- Fake API Implementation ---
// const generateFakeSearchResults = (query) => {
//   const results = {
//     product: [],
//   };




//   return results;
// };

// export default function SearchComponent() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [searchResults, setSearchResults] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [history, setHistory] = useState([]);
//   const inputRef = useRef(null);

//   useEffect(() => {
//     const storedHistory = localStorage.getItem(HISTORY_KEY);
//     if (storedHistory) {
//       setHistory(JSON.parse(storedHistory));
//     }
//   }, []);

//   const executeSearch = async (query) => {
//     if (!query) return;

//     setLoading(true);
//     setSearchResults(null);

//     if (inputRef.current) inputRef.current.value = query;

//     try {
//       // Simulate network delay
//       await new Promise((resolve) => setTimeout(resolve, 500));

//       // Generate fake search results
//       const fakeResults = generateFakeSearchResults(query);

//       // Simulate API response structure
//       const fakeApiResponse = {
//         status: true,
//         result: fakeResults,
//       };

//       if (fakeApiResponse.status && fakeApiResponse.result) {
//         setSearchResults(fakeApiResponse.result);
//         addToHistory(query);
//       }
//     } catch (error) {
//       toast.error("خطا شبکه");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") {
//       executeSearch(e.target.value.trim());
//     }
//   };

//   // --- افزودن به تاریخچه و ذخیره در LocalStorage ---
//   const addToHistory = (term) => {
//     setHistory((prev) => {
//       const newHistory = [term, ...prev.filter((item) => item !== term)].slice(
//         0,
//         10
//       );
//       localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
//       return newHistory;
//     });
//   };

//   // --- حذف یک مورد از تاریخچه ---
//   const removeFromHistory = (e, term) => {
//     e.stopPropagation();
//     setHistory((prev) => {
//       const newHistory = prev.filter((item) => item !== term);
//       localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
//       return newHistory;
//     });
//   };

//   useEffect(() => {
//     if (isOpen && inputRef.current) inputRef.current.focus();
//   }, [isOpen]);

//   return (
//     <>
//       <div
//         onClick={() => setIsOpen(true)}
//         className="w-full max-w-[380px] rounded-3xl bg-[#F5F5F5]
//          flex items-center px-4 cursor-pointer transition-opacity hover:opacity-90
//         "
//       >
//         <input
//           type="text"
//           placeholder="جستجو کنید"
//           readOnly
//           className="w-full bg-transparent outline-none py-3 text-sm placeholder:text-gray-400 cursor-pointer"
//         />
//         {/* <Image
//           src={searchIcon}
//           loading="eager"
//           alt="دس به دس"
//           width={24}
//           height={24}
//           quality={100}
//         /> */}
//       </div>

//       {/* --- دراور تمام صفحه --- */}
//       <div
//         className={`
//           fixed inset-0 z-50 bg-white flex flex-col transition-transform duration-300 ease-in-out
//            mx-auto
//           ${isOpen ? "translate-y-0" : "translate-y-full"}
//         `}
//       >
//         {/* هدر دراور */}
//         <div className="flex items-center gap-2 p-4 border-b border-gray-100">
//           <button
//             onClick={() => setIsOpen(false)}
//             className="p-2 text-gray-600"
//           >
//             <span className="text-xl">
//               <FaX />
//             </span>
//           </button>

//           <div className="flex-1 rounded-3xl bg-[#F5F5F5] flex items-center px-4">
//             <input
//               ref={inputRef}
//               onKeyDown={handleKeyDown}
//               type="text"
//               placeholder="جستجو کنید"
//               className="w-full bg-transparent outline-none py-3 text-sm placeholder:text-gray-400 text-right dir-rtl"
//             />
//             {/* <Image
//               src={searchIcon}
//               loading="eager"
//               alt="دس به دس"
//               width={24}
//               height={24}
//               quality={100}
//             /> */}
//           </div>
//         </div>

//         {/* محتوای اسکرول‌خور */}
//         <div className="flex-1 overflow-y-auto p-4 space-y-6 rtl">
//           {/* بخش تاریخچه جستجو (اضافه شده) */}
//           {history.length > 0 && (
//             <div className="animate-fade-in">
//               <p className="text-xs text-gray-400 mb-3 text-right">
//                 تاریخچه جستجوها:
//               </p>
//               <div className="flex flex-wrap gap-2 justify-end">
//                 {history.map((term, index) => (
//                   <div
//                     key={index}
//                     onClick={() => executeSearch(term)}
//                     className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-full cursor-pointer hover:bg-gray-100 transition-colors"
//                   >
//                     <span
//                       onClick={(e) => removeFromHistory(e, term)}
//                       className="text-gray-400 hover:text-red-500 p-0.5 rounded-full transition-colors"
//                     >
//                       <FaX size={10} />
//                     </span>
//                     <span className="text-sm text-gray-600">{term}</span>
//                     {/* <IoTimeOutline className="text-gray-400 text-sm" /> */}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* نمایش لودینگ */}
//           {loading && (
//             <div className="text-center text-gray-500 mt-10">
//               در حال جستجو...
//             </div>
//           )}

//           {/* نمایش نتایج */}
//           {!loading &&
//             searchResults &&
//             Object.keys(searchResults).map((key) => {
//               const items = searchResults[key];
//               const config = CATEGORY_CONFIG[key];

//               if (!config || !items || items.length === 0) return null;

//               return (
//                 <div key={key} className="animate-fade-in">
//                   <div className="flex justify-between items-center mb-4 border-b pb-2 border-gray-100">
//                     <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
//                       {config.title}
//                       {/* <span className="text-lg">{config.icon}</span> */}
//                     </h3>
//                   </div>

//                   <div className="w-full px-4 pb-2">
//                     <Swiper
//                       spaceBetween={12}
//                       slidesPerView={"auto"}
//                       freeMode={true}
//                       modules={[FreeMode]}
//                       className="w-full"
//                     >
//                       {items.map((item, index) => (
//                         <SwiperSlide key={index} className="!w-auto pl-3">
//                           <Link
//                             href={`/${config.link}/${
//                               config.title === "املاک" ? item.slug : item.id
//                             }`}
//                             className="
//                             w-[260px] flex
//                             items-center justify-between gap-3
//                             border border-gray-100 bg-white p-3 rounded-2xl
//                             shadow-sm hover:shadow-md transition-shadow
//                             select-none
//                           "
//                             draggable={false}
//                           >
//                             <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-100">
//                               <Image
//                                 src={
//                                   item.image_url || item.logo
//                                 }
//                                 alt={item.title}
//                                 height={200}
//                                 width={200}
//                                 className="w-full h-full object-cover"
//                               />
//                             </div>

//                             <div className="text-right flex-1 overflow-hidden">
//                               <p className="text-sm font-bold text-gray-800 truncate">
//                                 {item.title || item.name || "بدون نام"}
//                               </p>
//                               <p className="text-xs text-gray-500 mt-1 truncate">
//                                 {item.description ||
//                                   item.address ||
//                                   config.title}
//                               </p>
//                             </div>
//                           </Link>
//                         </SwiperSlide>
//                       ))}
//                     </Swiper>
//                   </div>
//                 </div>
//               );
//             })}

//           {!loading &&
//             searchResults &&
//             Object.values(searchResults).every(
//               (arr: any) => arr.length === 0
//             ) && (
//               <div className="text-center text-gray-500 mt-10">
//                 موردی یافت نشد.
//               </div>
//             )}
//         </div>
//       </div>
//     </>
//   );
// }
