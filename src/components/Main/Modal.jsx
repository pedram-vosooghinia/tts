// "use client";
// import { Button } from "../ui/button";
// import { Card, CardContent } from "../ui/card";
// import { useModalStore } from "@/store/modalStore";
// const Modal = ({ children, buttonConfig }) => {
//   const { isOpen, closeModal, activeModal, openModal } = useModalStore();
//   const handleOpenModal = () => {
//     openModal(buttonConfig.modalName);
//   };

//   return (
//     <>
//       <Button
//         onClick={handleOpenModal}
//         className={` ${buttonConfig?.className}`}
//         disabled={buttonConfig?.disabled}
//       >
//         {buttonConfig?.buttonName || "modal"}
//       </Button>
//       {isOpen && activeModal === buttonConfig?.modalName && (
//         <div className="modal-overlay">
//           <Card className="modal">
//             <CardContent className="modal-content flex flex-col">
//               <Button className="my-4  w-8  " onClick={closeModal}>
//                 &times;
//               </Button>
//               {children}
//             </CardContent>
//           </Card>
//         </div>
//       )}
//     </>
//   );
// };

// export default Modal;
