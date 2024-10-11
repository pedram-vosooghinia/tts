"use client";
const TelInput = ({ name, value, placeholder, register, required }) => {
  return (
    <input
      type="tel"
      name={name}
      value={value}
      placeholder={placeholder}
      className="w-full px-3 py-2 border rounded-md shadow-lg focus:outline-none focus:ring focus:border-blue-300"
      {...register(name, {
        required: required,
        pattern: {
          value: /^[0-9]{10}$/i,
          message: "شماره تماس باید بدون صفر و دقیقا 10 رقم باشد",
        },
      })}
    />
  );
};
export default TelInput;
