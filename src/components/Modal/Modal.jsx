import React, { useEffect, useCallback } from 'react';
import css from './Modal.module.css';

export const Modal = ({ modalData, handleCloseModal }) => {
  const handleKeyPress = useCallback(
    e => {
      if (e.code === 'Escape') {
        handleCloseModal();
      }
    },
    [handleCloseModal]
  );

  useEffect(() => {
    const onKeyPress = e => handleKeyPress(e);

    window.addEventListener('keydown', onKeyPress);

    return () => {
      window.removeEventListener('keydown', onKeyPress);
    };
  }, [handleKeyPress]);

  const handleOverlayClick = useCallback(
    e => {
      if (e.target === e.currentTarget) {
        handleCloseModal();
      }
    },
    [handleCloseModal]
  );

  return (
    <div className={css.Overlay} onClick={handleOverlayClick}>
      <img className={css.Modal} src={modalData} alt="" />
    </div>
  );
};
