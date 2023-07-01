import styles from './AccountButton.module.css';
import { Link } from 'react-router-dom';

const AccountButton = ({
  title,
  to,
  disabled,
  onClick,
  isActive,
  imageSrc,
}) => {
  return (
    <Link
      className={`${styles.accountButton} ${isActive ? styles.active : ''}`}
      to={to}
      disabled={disabled}
      onClick={onClick}
    >
      <img src={imageSrc} alt="icon" />
      {title}
    </Link>
  );
};

export default AccountButton;
