import React from 'react';
import css from './error.module.css';

export const ErrorMessage = ({ error }) => {
  return (
    <div className={css.ErrorContainer}>
      <div className={css.ErrorText}>
        <p>Oops...</p>
        <p>{error}</p>
      </div>
    </div>
  );
};
