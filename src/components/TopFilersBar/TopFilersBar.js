import React, { useContext } from 'react';
import SearchFilterContext from '../../utils/context/SearchFilterContext';
import styles from './TopFilersBar.module.css';
import Cross from './../../images/Actions/Close_gray.svg';

const TopFilersBar = () => {
  const { values, setValues } = useContext(SearchFilterContext);
  const arr = Object.entries(values);

  const deleteValue = (item) => {
    if (item === 'status' || item === 'tags' || item === 'specialities') {
      setValues({ ...values, [item]: [] });
    } else setValues({ ...values, [item]: null });
  };

  const handleClearFilter = () => {
    setValues({
      status: [],
      city: null,
      date: null,
      specialities: [],
      price: null,
      findTags: null,
      tags: [],
    });
  };

  const activeFilter = arr.filter((item) => item[1] && item[1].length !== 0);
  const filterCount = activeFilter.length !== 0 ? activeFilter : null;

  return (
    <div className={styles.container}>
      {filterCount && (
        <div className={styles.countContainer}>
          Фильры: {filterCount.length}
        </div>
      )}
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
      {filterCount && (
        <div onClick={handleClearFilter} className={styles.clearData}>
          очистить все
        </div>
      )}
    </div>
  );
};

export default TopFilersBar;
