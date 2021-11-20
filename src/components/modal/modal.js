import React, { useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import css from "./modal.module.css";

const modalRoot = document.getElementById("react-modals");

const Modal = ({ children, closeModal }) => {
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") closeModal();
    },
    [closeModal]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return createPortal(
    <ModalOverlay closeModal={closeModal}>
      <div className={css.root}>{children}</div>
    </ModalOverlay>,
    modalRoot
  );
};

export default Modal;
