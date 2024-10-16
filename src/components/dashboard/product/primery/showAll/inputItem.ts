"use client"

const primeryItems = [

  [
    {
      id: 2,
      label: "متن در صورت نیاز",
      type: "textarea",
      name: "product_need_text",
      placeholder: "متن محصول",
      error: "لفطا فیلد مورد نظر را پر نمایید",
      maxLength: 255,
    }
  ],
  [
    {
        id:3 ,
        label: "افزودن عکس",
        type: "file",
        name: "files",
        defaultValue: "",
        required: true,
        error: "لفطا عکس مورد نظر را وارد نمایید",
      },
  ],
];

const primeybutton = {
  label: "افزودن محصول",
};

export { primeryItems, primeybutton };
