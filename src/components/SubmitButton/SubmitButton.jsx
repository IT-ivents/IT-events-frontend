import styles from './SubmitButton.module.css';

const SubmitButton = ({ title, disabled, width, onClick }) => {
  return (
    <button
      className={styles.submitBtn}
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={{ width: width }}
    >
      {title}
    </button>
  );
};

export default SubmitButton;
