import React, { useRef, FC, MouseEvent } from "react";
import css from "./modal-overlay.module.css";

interface IModalOverlayProps {
  closeModal: () => void;
}

const ModalOverlay: FC<IModalOverlayProps> = ({ closeModal }) => {
  const modalOverlayRef = useRef(null);
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === modalOverlayRef.current) closeModal();
  };

  return (
    <div ref={modalOverlayRef} onClick={handleClick} className={css.root} />
  );
};

export default ModalOverlay;
