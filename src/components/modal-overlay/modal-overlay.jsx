import React, { useRef } from "react";
import PropTypes from "prop-types";
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

ModalOverlay.propTypes = {
  children: PropTypes.element.isRequired,
  closeModal: PropTypes.func,
};

export default ModalOverlay;
