"use client";

const TextareaForm = ({ name, value, placeholder, register, required }) => {
  return (
    <textarea
      name={name}
      value={value}
      placeholder={placeholder}
      className="rtl w-80 h-80 border rounded-md shadow-lg focus:outline-none focus:ring focus:border-blue-300"
      {...register(name, {
        required: required || false,
      })}
    />
  );
};

export default TextareaForm;
