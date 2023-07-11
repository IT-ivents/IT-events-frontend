import styles from './SearchField.module.css';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import searchIcon from '../../images/Actions/loupe-purple.svg';

const SearchField = ({
  onSearch,
  smallForm,
  smallFieldset,
  smallInput,
  searchQuery,
  radiusForm,
}) => {
  // Устанавливаем значение в поисковую строку из Пропса
  const [query, setQuery] = useState(searchQuery || '');
  const location = useLocation();
  const isResultsPage = location.pathname === '/results';
  const placeholder =
    isResultsPage && typeof query !== 'string'
      ? ''
      : 'Поиск по направлению, названию, теме или городу';

  const setPageQuery = () => {
    setQuery(searchQuery);
  };
  // Чтобы чертова поисковая строка была заполнена результатом только на странице results
  useEffect(() => {
    if (isResultsPage) {
      setPageQuery(searchQuery);
    } else {
      setPageQuery('');
      setQuery('');
    }
  }, [location]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimQuery = query.trim();
    onSearch(trimQuery);
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
      style={smallForm || radiusForm}
    >
      <fieldset className={styles.fieldset} style={smallFieldset}>
        <img src={searchIcon} alt="search-icon" className={styles.icon} />
        <input
          className={styles.input}
          placeholder={placeholder}
          onChange={handleChange}
          value={query || ''}
          type="text"
          style={smallInput}
        />
      </fieldset>
    </form>
  );
};

export default SearchField;
