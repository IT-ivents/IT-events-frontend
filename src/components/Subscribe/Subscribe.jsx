import styles from './Subscribe.module.css';
import { useState } from 'react';
import PrimaryButton from '../PrimaryButton/PrimaryButton';

const Subscribe = () => {
  const [value, setValue] = useState('');
  const [hidden, setHidden] = useState(false);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleHideClick = (e) => {
    setHidden(true);
  };

  return (
    <section
      className={`${styles.subscribeSection} ${hidden ? styles.hidden : ''}`}
    >
      <h3 className={styles.headText}>Не пропустите лучшие события недели!</h3>
      <p className={styles.subtext}>
        Один раз в неделю мы будем высылать вам на почту подборку самых
        популярных статей за прошедшую неделю!{' '}
      </p>
      <p className={styles.subtext}>Максимум пользы, за минимум времени!</p>
      <form className={styles.subscibeForm}>
        <input
          className={styles.subscribeInput}
          type="text"
          placeholder="Электронная почта"
          value={value}
          onChange={handleChange}
        />
        <PrimaryButton type="submit" title="Подписаться" onClick={() => {}} />
      </form>
      <button
        className={styles.alreadyButton}
        type="button"
        onClick={handleHideClick}
      >
        Я уже подписался
      </button>
    </section>
  );
};

export default Subscribe;
