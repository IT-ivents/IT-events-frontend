import styles from './SecurityForm.module.css';

const SecurityForm = () => {
  return (
    <form className={styles.form}>
      <fieldset className={styles.fieldset}>
        <label className={styles.label}>Старый пароль</label>
        <input className={styles.input} />
      </fieldset>
      <fieldset className={styles.fieldset}>
        <label className={styles.label}>Новый пароль</label>
        <input className={styles.input} />
      </fieldset>{' '}
      <fieldset className={styles.fieldset}>
        <label className={styles.label}>Подтвердите новый пароль</label>
        <input className={styles.input} />
      </fieldset>
      <button type="submit" className={styles.submitButton}>
        Обновить
      </button>
    </form>
  );
};

export default SecurityForm;
