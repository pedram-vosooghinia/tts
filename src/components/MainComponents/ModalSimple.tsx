"use client";
import { ReactNode } from "react";

interface ModalSimpleProp {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const ModalSimple = ({ isOpen, onClose, children }: ModalSimpleProp) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center z-1000">
      <div className="bg-white p-6 rounded-md relative z-1001">
        <button
          className="absolute top-2 right-2 bg-none border-none text-xl cursor-pointer text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default ModalSimple;