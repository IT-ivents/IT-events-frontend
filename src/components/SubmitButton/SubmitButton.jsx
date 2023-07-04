import styles from './SubmitButton.module.css';

const SubmitButton = ({ title, disabled, style, onClick }) => {
  return (
    <button
      className={styles.submitBtn}
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      {title}
    </button>
  );
};

export default SubmitButton;
