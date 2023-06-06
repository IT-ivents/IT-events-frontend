import styles from './ShowAllButton.module.css';

const ShowAllButton = ({ handleShowAll }) => {
  return (
    <button
      className={styles.showAllButton}
      onClick={handleShowAll}
      type="button"
    >
      Показать все
    </button>
  );
};

export default ShowAllButton;
