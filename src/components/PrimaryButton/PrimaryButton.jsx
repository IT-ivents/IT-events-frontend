import styles from './PrimaryButton.module.css';
import RightArrow from './../../images/Arrows/arrow-right.svg';
import { Link } from 'react-router-dom';

const PrimaryButton = ({ title, to, disabled, style }) => {
  return (
    <Link
      className={styles.primaryButton}
      to={to}
      target="_blank"
      disabled={disabled}
      style={style}
    >
      {title}
      <figure className={styles.figure}>
        <img src={RightArrow} alt="Arrow" />
      </figure>
    </Link>
  );
};

export default PrimaryButton;
