import styles from './SubmitButton.module.css';

const SubmitButton = ({ title, disabled }) => {
  return (
    <button className={styles.submitBtn} type="button" disabled={disabled}>
      {title}
    </button>
  );
};

export default SubmitButton;
