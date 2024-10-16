"use client";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { useModalStore } from "@/store/modalStore";
import { ReactNode } from "react";

interface ButtonConfig {
  modalName: string;
  className?: string;
  disabled?: boolean;
  buttonName?: string;
}

// Define the props for the Modal component
interface ModalProps {
  children: ReactNode;
  buttonConfig: ButtonConfig;
}



const Modal = ({ children, buttonConfig }:ModalProps) => {
  const { isOpen, closeModal, activeModal, openModal } = useModalStore();
  const handleOpenModal = () => {
    openModal(buttonConfig.modalName);
  };

  return (
    <>
      <Button
        onClick={handleOpenModal}
        className={` ${buttonConfig?.className}`}
        disabled={buttonConfig?.disabled}
      >
        {buttonConfig?.buttonName || "modal"}
      </Button>
      {isOpen && activeModal === buttonConfig?.modalName && (
        <div className="modal-overlay">
          <Card className="modal">
            <CardContent className="modal-content flex flex-col">
              <Button className="my-4  w-8  " onClick={closeModal}>
                &times;
              </Button>
              {children}
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default Modal;
