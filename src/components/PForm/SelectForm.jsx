"use client"

const SelectForm = ({ name, value, options, register, required }) => {
  return (
    <select
      name={name}
      value={value}
      className="rtl sm:w-80 w-40 px-3 py-2 border rounded-md shadow-lg focus:outline-none focus:ring focus:border-blue-300"
      {...register(name, {
        required: required || false,
      })}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};

export default SelectForm;


// example
// [
//   {
//     id: 1,
//     label: "دسته بندی",
//     type: "select",
//     name: "category",
//     required: true,
//     option: [
//       {
//         value: "scarf",
//         label: "روسری",
//       },
//       {
//         value: "shawl",
//         label: "شال",
//       },
//     ],
//   },
// ],