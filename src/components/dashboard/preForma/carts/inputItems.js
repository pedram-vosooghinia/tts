"use client"

const detailCartItems = [
  [
    {
      id: 1,
      label: "تخفیف",
      type: "number",
      name: "discount",
    },
    {
      id: 2,
      label: "نام فروشنده",
      type: "select",
      name: "marketer_name",
      required: true,
      option: [
        {
          value: "",
          label: "",
        },
        {
          value: "tetis",
          label: "tetis",
        },
        {
          value: "joyande",
          label: "joyande",
        },
      ],
    },
  ],
  [
    {
      id: 3,
      label: "نوع خرید",
      type: "select",
      name: "buy_type",
      required: true,
      option: [
        {
          value: "",
          label: "",
        },
        {
          value: "onsite",
          label: "حضوری",
        },
        {
          value: "send",
          label: "ارسال",
        },
      ],
    },
  ],
];

const detailCartbutton = {
  label: "افزودن",
};

export { detailCartItems, detailCartbutton };
