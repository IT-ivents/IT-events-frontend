import styles from './SearchList.module.css';
import { useState } from 'react';

const arr = [
  'Москва',
  'Можайск',
  'Московский',
  'Мурманск',
  'Мценск',
  'Мытищи',
  'Монако',
];

const SearchList = () => {
  return (
    <ul className={styles.autocomplete}>
      {arr.map((city, index) => {
        return (
          <li key={index} className={styles.autocomplete__item}>
            {city}
          </li>
        );
      })}
    </ul>
  );
};

export default SearchList;
