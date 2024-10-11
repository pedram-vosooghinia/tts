"use client";
const NumberInput = ({ name, placeholder, register, required }) => {
 return (
    <input
      type="number"
      name={name}
      placeholder={placeholder}
      min="0"
      max="9999999999"
      className="rtl sm:w-80 w-40 px-3 py-2 border rounded-md shadow-lg focus:outline-none focus:ring focus:border-blue-300"
      {...register(name, {
        required: required,
      })}
    />
  );
};

export default NumberInput;
