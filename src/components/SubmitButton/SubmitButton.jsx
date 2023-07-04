import styles from './SubmitButton.module.css';

const SubmitButton = ({ title, type, disabled, width, onClick }) => {
  return (
    <button
      className={styles.submitBtn}
      type={type || 'button'}
      onClick={onClick}
      disabled={disabled}
      style={{ width: width }}
    >
      {title}
    </button>
  );
};

export default SubmitButton;
