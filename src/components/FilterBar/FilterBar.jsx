import styles from './FilterBar.module.css';

const FilterBar = ({ onFilter }) => {
  const handleFilterClick = (option) => {
    if (onFilter) {
      onFilter(option);
    }
  };

  return (
    <>
      <ul className={`${styles.list}`}>
        <li className={styles.item}>
          <button
            type="button"
            className={styles.filterButton}
            onClick={() => {
              handleFilterClick('name');
            }}
          >
            Название
          </button>
        </li>
        <li className={styles.item}>
          <button
            type="button"
            className={styles.filterButton}
            onClick={() => {
              handleFilterClick('date');
            }}
          >
            Дата
          </button>
        </li>
        <li className={styles.item}>
          <button
            type="button"
            className={styles.filterButton}
            onClick={() => {
              handleFilterClick('price');
            }}
          >
            Цена
          </button>
        </li>
      </ul>
      <div className={styles.divider}></div>
    </>
  );
};

export default FilterBar;
