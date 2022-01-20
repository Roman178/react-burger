import React, { useCallback, useEffect, FC } from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { createPortal } from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import css from "./modal.module.css";

const modalRoot = document.getElementById("react-modals") as HTMLDivElement;

interface IModalProps {
  closeModal: () => void;
}

const Modal: FC<IModalProps> = ({ children, closeModal }) => {
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
    <>
      <ModalOverlay closeModal={closeModal} />
      <div className={css.root}>
        <div onClick={closeModal} className={css.closeIconBox}>
          <CloseIcon type="primary" />
        </div>
        {children}
      </div>
    </>,
    modalRoot
  );
};

export default Modal;
