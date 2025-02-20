"use client";
const LoadingModal = () => {
  return (
    <div className=" position:fixed inset-0 flex justify-center items-center  z-50">
      <div className="w-16 h-16 border-8 border-t-purple-500 border-white border-opacity-30 rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingModal;

