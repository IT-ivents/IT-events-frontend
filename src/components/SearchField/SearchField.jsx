import styles from './SearchField.module.css';
import searchIcon from '../../images/search-icon.svg';
import { useState, useRef } from 'react';

const SearchField = ({ onSearch }) => {
  const [value, setValue] = useState('');
  //const timeoutIdRef = useRef();

  // // Метод debounce чтобы отправлять запрос на поиск не на каждый ввод, а с задержкой 500мс.
  // const handleChange = (e) => {
  //   const searchQuery = e.target.value;
  //   setValue(searchQuery);
  //   clearTimeout(timeoutIdRef.current);
  //   timeoutIdRef.current = setTimeout(() => {
  //     onSearch(searchQuery);
  //   }, 1000);
  // };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(value);
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
