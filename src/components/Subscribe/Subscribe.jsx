import styles from './Subscribe.module.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import PrimaryButton from '../PrimaryButton/PrimaryButton';
import CustomCheckbox from '../CustomCheckbox/CustomCheckbox';

const Subscribe = () => {
  const [value, setValue] = useState('');
  const [hidden, setHidden] = useState(false);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  //  const handleSubscribeClick = (e) => {
  //   e.preventDefault()
  //   if(isButtonEnabled) {
  //     return ''
  //   }
  // }

  //  const handleCheckboxClick = () => {
  //   setIsCheckboxChecked(!isCheckboxChecked);
  //   setIsButtonEnabled(!isButtonEnabled);
  // };

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
          type="email"
          required
          placeholder="Электронная почта"
          value={value}
          onChange={handleChange}
        />
        <PrimaryButton type="button" title="Подписаться" onClick={() => {}} />
      </form>
      <div className={styles.checkboxContainer}>
        <CustomCheckbox />
        <p className={styles.policyText}>
          Нажимая кнопку «Подписаться», вы соглашаетесь <br />c{' '}
          <Link to="/privacy" className={styles.policyLink}>
            Политикой конфиденциальности.
          </Link>
        </p>
      </div>
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
