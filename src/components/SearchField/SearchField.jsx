import styles from './SearchField.module.css';
import searchIcon from '../../images/search-icon.svg';
import { useState } from 'react';

const SearchField = ({ onSearch }) => {
  const [value, setValue] = useState('');
  let timeoutId;

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  // Метод debounce чтобы отправлять запрос на поиск не на каждый ввод, а с задержкой 500мс.
  const handleSubmit = (e) => {
    clearTimeout(timeoutId);
    e.preventDefault();
    timeoutId = setTimeout(() => {
      onSearch(value);
    }, 500);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <fieldset className={styles.fieldset}>
        <img src={searchIcon} alt="search-icon" className={styles.icon} />
        <input
          className={styles.input}
          placeholder="Поиск по направлению, названию, теме или городу"
          onChange={handleChange}
          value={value}
          type="text"
        />
      </fieldset>
    </form>
  );
};

export default SearchField;
