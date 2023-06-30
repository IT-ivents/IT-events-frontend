import styles from './SubmitButton.module.css';

const SubmitButton = ({ title, disabled, width }) => {
  return (
    <button
      className={styles.submitBtn}
      type="button"
      disabled={disabled}
      style={{ width: width }}
    >
      {title}
    </button>
  );
};

export default SubmitButton;
