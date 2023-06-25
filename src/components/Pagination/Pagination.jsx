import React from 'react';
import styles from './Pagination.module.css';

const Pagination = ({ page, totalPages, handleShowMore, handleShowLess }) => {
  const isFirstPage = page === 1;
  const isLastPage = page === totalPages;

  return (
    <div className={styles.container}>
      <button
        type="button"
        onClick={handleShowLess}
        className={`${styles.currentPage} ${
          isFirstPage ? styles.disabled : ''
        } ${styles.toLeft}`}
        disabled={isFirstPage}
      />
      <p className={styles.currentPage}>{page}</p>
      <button
        type="button"
        onClick={handleShowMore}
        className={`${styles.currentPage} ${
          isLastPage ? styles.disabled : ''
        } ${styles.toRight}`}
        disabled={isLastPage}
      />
      <p>из {totalPages}</p>
    </div>
  );
};

export default Pagination;
