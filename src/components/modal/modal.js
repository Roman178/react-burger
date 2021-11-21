import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import css from "./modal.module.css";

const modalRoot = document.getElementById("react-modals");

const Modal = ({ children, closeModal, isOpenModalProp }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

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

  useEffect(() => {
    setIsOpenModal(isOpenModalProp);
  }, [isOpenModalProp]);

  return (
    isOpenModal &&
    createPortal(
      <ModalOverlay closeModal={closeModal}>
        <div className={css.root}>
          <div onClick={closeModal} className={css.closeIconBox}>
            <CloseIcon type="primary" />
          </div>
          {children}
        </div>
      </ModalOverlay>,
      modalRoot
    )
  );
};

export default Modal;
