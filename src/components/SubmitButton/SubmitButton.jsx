import { Link } from 'react-router-dom';
import styles from './SubmitButton.module.css';

const SubmitButton = ({ title, to, type, disabled, style, onClick }) => {
  return (
    <Link
      className={styles.submitBtn}
      to={to}
      type={type || 'button'}
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      {title}
    </Link>
  );
};

export default SubmitButton;
