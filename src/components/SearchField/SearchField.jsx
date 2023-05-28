import styles from './SearchField.module.css';
import searchIcon from '../../images/search-icon.svg';
import { useState } from 'react';

const SearchField = () => {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <form className={styles.form}>
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
