"use client"
import jalaaliJs from "jalaali-js";
function getCurrentJalaliDate():JalaliDate {
  const now = new Date();
  const { jy, jm, jd } = jalaaliJs.toJalaali(
    now.getFullYear(),
    now.getMonth() + 1,
    now.getDate()
  );
  const formattedYear = jy.toString()
  const formattedMonth = jm.toString().padStart(2, "0");
  const formattedDay = jd.toString().padStart(2, "0");
  return {
    year: formattedYear,
    month: formattedMonth,
    day: formattedDay,
    fullDate: `${jy}-${formattedMonth}-${formattedDay}`,
  };
}
export default getCurrentJalaliDate;
