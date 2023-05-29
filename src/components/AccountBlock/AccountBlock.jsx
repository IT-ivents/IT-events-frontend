import styles from './AccountBlock.module.css';
import { useNavigate } from 'react-router-dom';

const AccountBlock = ({ accoutBlockIcon, title, details }) => {
  const navigate = useNavigate();

  const handleBlockClick = () => {
    navigate('/account/details');
  };

  return (
    <div className={styles.blockBorder} onClick={handleBlockClick}>
      <img src={accoutBlockIcon} alt="Icon" />
      <div className={styles.blockTitle}>{title}</div>
      <div className={styles.blockDetails}>{details}</div>
    </div>
  );
};

export default AccountBlock;
