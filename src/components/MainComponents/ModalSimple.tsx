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
    <>
      <div className="modal-overlay ">
        <div className="modal">
          <button className="modal-close" onClick={onClose}>
            &times;
          </button>
          {children}
        </div>
      </div>
      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .modal {
          background-color: white;
          padding: 20px;
          border-radius: 5px;
          position: relative;
          z-index: 1001;
        }

        .modal-close {
          position: absolute;
          top: 10px;
          right: 10px;
          background: none;
          border: none;
          font-size: 20px;
          cursor: pointer;
          color: #333;
        }
      `}</style>
    </>
  );
};

export default ModalSimple;
