"use client"

const customerItem = [
  [
    {
      id: 1,
      label: "جنسیت",
      type: "select",
      name: "gender",
      defaultValue: "",
      error: "لفطا فیلد مورد نظر را پر نمایید",
      mobileSize: true,

      option: [
        {
          value: "",
          label: "",
        },
        {
          value: "خانم",
          label: "خانم",
        },
        {
          value: "آقای",
          label: "آقای",
        },
      ],
    },

    {
      id: 2,
      label: "نام و نام خانوادگی",
      type: "text",
      name: "name",
      required: true,
      mobileSize: true,
    },
  ],
  [
    {
      id: 3,
      label: "شماره تماس",
      type: "number",
      name: "mobile",
      defaultValue: "",
      required: true,
      mobileSize: true,
      placeholder: "9001002030",
    },
    {
      id: 4,
      label: "شهر",
      type: "text",
      name: "city",
      required: true,
      mobileSize: true,
    },
    {
      id: 5,
      label: "اسم بازاریاب",
      type: "select",
      name: "marketer_name",
      mobileSize: true,
      option: [
        {
          value: "",
          label: "",
        },
        {
          value: "tetis_1",
          label: "tetis_1",
        },
        {
          value: "joyande_2",
          label: "joyande_2",
        },
      ],
    },
  ],
];

const customerbutton = {
  label: "افزودن مشتری ",
};

export { customerItem, customerbutton };
