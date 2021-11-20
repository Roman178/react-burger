import React, { useEffect, useRef } from "react";
import css from "./modal-overlay.module.css";

const ModalOverlay = ({ closeModal, children }) => {
  const modalOverlayRef = useRef(null);

  const handleClick = (e) => {
    if (e.target === modalOverlayRef.current) closeModal();
  };

  return (
    <div ref={modalOverlayRef} onClick={handleClick} className={css.root}>
      {children}
    </div>
  );
};

export default ModalOverlay;
