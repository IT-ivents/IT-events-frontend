import styles from './PrimaryButton.module.css';
import RightArrow from './../../images/Arrows/arrow-right.svg';

const PrimaryButton = ({ title, type, onClick }) => {
  return (
    <button
      className={styles.primaryButton}
      type={type || 'button'}
      onClick={onClick}
    >
      {title}
      <img src={RightArrow} alt="Arrow" />
    </button>
  );
};

export default PrimaryButton;
