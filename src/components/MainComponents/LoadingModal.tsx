"use client";
const LoadingModal = () => {
  return (
    <div className=" h-screen">
      <div className=" h-1/2    flex justify-center items-center  z-50">
        <div className="w-16 h-16 border-8 border-t-mainGold border-white border-opacity-30 rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default LoadingModal;
