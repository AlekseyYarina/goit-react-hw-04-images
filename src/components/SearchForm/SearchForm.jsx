import React, { useState } from 'react';
import css from './SearchForm.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export const SearchForm = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState('');
  const handleSubmit = e => {
    e.preventDefault();
    onSearch(searchValue);
  };

  return (
    <form className={css.SearchForm} onSubmit={handleSubmit}>
      <input
        className={css.SearchFormInput}
        type="text"
        name="searchInput"
        required
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
      />

      <button className={css.SearchFormButton} type="submit">
        <FontAwesomeIcon icon={faSearch} style={{ fontSize: '24px' }} />
      </button>
    </form>
  );
};
