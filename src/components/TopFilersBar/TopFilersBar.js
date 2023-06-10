import React, { useContext } from 'react';
import SearchFilterContext from '../../utils/context/SearchFilterContext';
import styles from './TopFilersBar.module.css';
import Cross from './../../images/Actions/Close_gray.svg';

const TopFilersBar = () => {
  const { values, setValues } = useContext(SearchFilterContext);
  const arr = Object.entries(values);
  const deleteValue = (item) => {
    console.log(item);
    if (item === 'status' || item === 'tags' || item === 'specialities') {
      setValues({ ...values, [item]: [] });
    } else setValues({ ...values, [item]: null });
  };

  return (
    <div className={styles.container}>
      {arr.map((item, index) => {
        const text = () => {
          const name = item[0];
          const value = item[1];

          if (name === 'findTags') {
            return null;
          } else if (value && value.length !== 0) {
            if (typeof value === 'string') {
              return value;
            } else return value.join(', ');
          }
        };
        return (
          text() && (
            <button
              onClick={() => deleteValue(item[0])}
              className={styles.button}
              key={index}
              type="button"
            >
              <span className={styles.text}>{text()}</span>
              <img src={Cross} alt="Cross" />
            </button>
          )
        );
      })}
    </div>
  );
};

export default TopFilersBar;
