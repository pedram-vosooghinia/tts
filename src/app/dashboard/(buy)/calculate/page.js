// "use client";
// import { useState, useEffect } from "react";

// function BuyCheck() {
//   const [buy, setBuy] = useState("");
//   const [percent, setPercent] = useState("");
//   const [values, setValues] = useState(null);
//   const [buy2, setBuy2] = useState("");
//   const [sell2, setSell2] = useState("");
//   const [values2, setValues2] = useState(null);

//   useEffect(() => {
//     if (buy && percent) {
//       const inputNumber = parseFloat(buy);
//       const percentNumber = parseFloat(percent);
//       if (!isNaN(inputNumber) && !isNaN(percentNumber)) {
//         const sell = (inputNumber * (1 + percentNumber / 100)).toFixed(1);
//         const marketer = (sell * 0.07).toFixed(1);
//         const justVN = (sell - inputNumber).toFixed(1);
//         const pureWithoutMarketer = (justVN - marketer).toFixed(1);
//         const result = {
//           sell,
//           marketer,
//           justVN,
//           pureWithoutMarketer,
//         };
//         setValues(result);
//       } else {
//         setValues(null);
//       }
//     } else {
//       setValues(null);
//     }

//     if (buy2 && sell2) {
//       const inputBuy = parseFloat(buy2);
//       const inputSell = parseFloat(sell2);
//       if (!isNaN(inputBuy) && !isNaN(inputSell)) {
//         const percent2 = ((inputSell / inputBuy - 1) * 100).toFixed(1);
//         const marketer2 = (inputSell * 0.07).toFixed(1);
//         const justVN2 = (inputSell - inputBuy).toFixed(1);
//         const pureWithoutMarketer2 = (justVN2 - marketer2).toFixed(1);
//         const result2 = {
//           percent2,
//           marketer2,
//           justVN2,
//           pureWithoutMarketer2,
//         };
//         setValues2(result2);
//       } else {
//         setValues2(null);
//       }
//     } else {
//       setValues2(null);
//     }
//   }, [buy, percent, buy2, sell2]);

//   return (
//     <div className="rtl flex justify-center flex-wrap">
//       <div className="m-6">
//         <div className="flex-col justify-start ">
//           <div className="my-2">قیمت خرید:</div>
//           <input
//             type="number"
//             value={buy}
//             onChange={(e) => setBuy(e.target.value)}
//           />
//         </div>
//         <div className="flex-col">
//           <div className="my-2">درصد:</div>
//           <input
//             type="number"
//             value={percent}
//             onChange={(e) => setPercent(e.target.value)}
//           />
//         </div>
//         {values && (
//           <>
//             <div>قیمت فروش: {values.sell}</div>
//             <div>سود ناخالص1: {values.justVN}</div>
//             <div>سود مشتری: {values.marketer}</div>
//             <div>سود ناخالص2: {values.pureWithoutMarketer}</div>
//           </>
//         )}
//       </div>
//       <div>
//         <div className="flex-col ">
//           <div className="my-2">قیمت فروش:</div>
//           <input
//             type="number"
//             value={sell2}
//             onChange={(e) => setSell2(e.target.value)}
//           />
//         </div>
//         <div>
//           <div className="my-2">قیمت خرید:</div>
//           <input
//             type="number"
//             value={buy2}
//             onChange={(e) => setBuy2(e.target.value)}
//           />
//         </div>
//         {values2 && (
//           <>
//             <div>درصد سود: {values2.percent2}</div>
//             <div>سود ناخالص1: {values2.justVN2}</div>
//             <div>سود مشتری: {values2.marketer2}</div>
//             <div>سود ناخالص2: {values2.pureWithoutMarketer2}</div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default BuyCheck;
