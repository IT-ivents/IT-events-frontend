import styles from './PrimaryButton.module.css';
import RightArrow from './../../images/Arrows/arrow-right.svg';
import { Link } from 'react-router-dom';

const PrimaryButton = ({ title, to }) => {
  return (
    <Link className={styles.primaryButton} to={to} target="_blank">
      {title}
      <img src={RightArrow} alt="Arrow" />
    </Link>
  );
};

export default PrimaryButton;
