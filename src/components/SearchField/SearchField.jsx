import styles from './SearchField.module.css';
import { useState } from 'react';
import searchIcon from '../../images/search-icon.svg';

const SearchField = ({ onSearch, smallForm, smallFieldset, smallInput }) => {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(value);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} style={smallForm}>
      <fieldset className={styles.fieldset} style={smallFieldset}>
        <img src={searchIcon} alt="search-icon" className={styles.icon} />
        <input
          className={styles.input}
          placeholder="Поиск по направлению, названию, теме или городу"
          onChange={handleChange}
          value={value}
          type="text"
          style={smallInput}
        />
      </fieldset>
    </form>
  );
};

export default SearchField;
