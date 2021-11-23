import React, { useRef } from "react";
import PropTypes from "prop-types";
import css from "./modal-overlay.module.css";

const ModalOverlay = ({ closeModal }) => {
  const modalOverlayRef = useRef(null);
  const handleClick = (e) => {
    if (e.target === modalOverlayRef.current) closeModal();
  };

  return (
    <div ref={modalOverlayRef} onClick={handleClick} className={css.root} />
  );
};

ModalOverlay.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default ModalOverlay;
