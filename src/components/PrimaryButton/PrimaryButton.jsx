import styles from './PrimaryButton.module.css';
import RightArrow from './../../images/Arrows/arrow-right.svg';
import { Link } from 'react-router-dom';

const PrimaryButton = ({ title, to, disabled }) => {
  return (
    <Link
      className={styles.primaryButton}
      to={to}
      target="_blank"
      disabled={disabled}
    >
      {title}
      <img src={RightArrow} alt="Arrow" />
    </Link>
  );
};

export default PrimaryButton;
