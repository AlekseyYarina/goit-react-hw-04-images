import React, { useEffect } from 'react';
import css from './Modal.module.css';

export const Modal = ({ modalData, handleCloseModal }) => {
  useEffect(() => {
    const handleKeyPress = e => {
      if (e.code === 'Escape') {
        handleCloseModal();
      }
    };

    const onKeyPress = e => handleKeyPress(e);
    window.addEventListener('keydown', onKeyPress);

    return () => {
      window.removeEventListener('keydown', onKeyPress);
    };
  }, [handleCloseModal]);

  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  return (
    <div className={css.Overlay} onClick={handleOverlayClick}>
      <img className={css.Modal} src={modalData} alt="" />
    </div>
  );
};
