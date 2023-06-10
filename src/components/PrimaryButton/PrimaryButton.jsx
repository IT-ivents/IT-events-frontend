import styles from './PrimaryButton.module.css';
import RightArrow from './../../images/Arrows/arrow-right.svg';

const PrimaryButton = ({ title }) => {
  return (
    <button className={styles.primaryButton} type="button">
      {title}
      <img src={RightArrow} alt="Arrow" />
    </button>
  );
};

export default PrimaryButton;
