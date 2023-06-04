import React from 'react';
import styles from './Pagination.module.css';

const Pagination = ({ page, totalPages }) => {
  return (
    <div className={styles.container}>
      <p>Страница</p>
      <p className={styles.currentPage}>{page}</p>
      <p>из {totalPages}</p>
    </div>
  );
};

export default Pagination;
