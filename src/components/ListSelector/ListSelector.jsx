import styles from './ListSelector.module.css';
import rightArrow from '../../images/right-arrow.svg';
import leftArrow from '../../images/left-arrow.svg';

const ListSelector = () => {
  return (
    <div className={styles.pageSelector}>
      <figure className={styles.figure}>
        <img src={leftArrow} alt="arrow-icon" />
      </figure>
      <span>1 из 7</span>
      <figure className={styles.figure}>
        <img src={rightArrow} alt="arrow-icon" />
      </figure>
    </div>
  );
};

export default ListSelector;
