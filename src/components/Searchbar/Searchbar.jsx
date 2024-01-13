import { SearchForm } from 'components/SearchForm/SearchForm';
import css from './Searchbar.module.css';

export const Searchbar = ({ onSearch }) => {
  return (
    <div className={css.Searchbar}>
      <SearchForm onSearch={onSearch} />
    </div>
  );
};
