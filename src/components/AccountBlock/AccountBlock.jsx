import styles from './AccountBlock.module.css';

const AccountBlock = ({ accoutBlockIcon, title, details }) => {
  return (
    <div className={styles.blockBorder}>
      <img src={accoutBlockIcon} alt="Icon" />
      <div className={styles.blockTitle}>{title}</div>
      <div className={styles.blockDetails}>{details}</div>
    </div>
  );
};

export default AccountBlock;
