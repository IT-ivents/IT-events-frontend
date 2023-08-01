import React, { useContext } from 'react';
import { useFiltersContext } from '../../utils/context/SearchFilterContext';
import styles from './TopFilersBar.module.css';
import Cross from './../../images/Actions/Close_gray.svg';

const TopFilersBar = ({ style }) => {
  const { values, setValues } = useFiltersContext();
  const arr = Object.entries(values);

  const deleteValue = (item, tag) => {
    if (item === 'status' || item === 'tags' || item === 'specialities') {
      const updatedValues = { ...values };
      updatedValues[item] = values[item].filter((value) => value !== tag);
      setValues(updatedValues);
    } else {
      setValues({ ...values, [item]: null });
    }
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

  // Создание отдельного массива тегов
  const tags = arr.reduce((acc, [name, value]) => {
    if (name !== 'findTags' && value && value.length !== 0) {
      const tagArr = Array.isArray(value) ? value : value.split(', ');
      return acc.concat(tagArr);
    }
    return acc;
  }, []);

  const filterCount = tags.length !== 0 ? tags : null;

  if (!filterCount) {
    return null;
  }

  return (
    <div className={styles.container} style={style}>
      <div className={styles.countContainer}>Фильтры: {filterCount.length}</div>
      {arr.map((item, index) => {
        const name = item[0];
        const value = item[1];

        if (name === 'findTags') {
          return null;
        } else if (value && value.length !== 0) {
          const tags = Array.isArray(value) ? value : value.split(', ');

          return tags.map((tag, tagIndex) => (
            <button className={styles.button} key={tagIndex} type="button">
              <span className={styles.text}>{tag}</span>
              <img
                src={Cross}
                alt="Cross"
                onClick={() => deleteValue(item[0], tag)}
              />
            </button>
          ));
        }
        return null;
      })}
      {filterCount && (
        <div onClick={handleClearFilter} className={styles.clearData}>
          Очистить все
        </div>
      )}
    </div>
  );
};

export default TopFilersBar;
