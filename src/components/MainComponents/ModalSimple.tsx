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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="relative w-full max-w-md rounded-lg border bg-background p-6">
        <button
          type="button"
          className="absolute left-3 top-3 text-muted-foreground transition-colors hover:text-foreground"
          onClick={onClose}
          aria-label="بستن"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default ModalSimple;