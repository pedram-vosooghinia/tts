"use client"

const customerItemTable = [
    {
      title: "جنسیت",
      value: (row) => row?.gender,
    },
    { title: "نام", value: (row) => row?.total_name },
    {
      title: "موبایل",
      value: (row) => row?.mobile,
    },
    {
      title: "شهر",
      value: (row) => row?.city,
    },
    {
      title: "نام بازاریاب",
      value: (row) => row?.marketer_name,
    }
  ];
  export default customerItemTable