import styles from './Subscribe.module.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import PrimaryButton from '../PrimaryButton/PrimaryButton';
import CustomCheckbox from '../CustomCheckbox/CustomCheckbox';
import Background from '../../images/Forms/img-background-purple.svg';
import Line from '../../images/Forms/line.svg';
import Man from '../../images/Forms/man.svg';
import Arrow from '../../images/Forms/man-arrow.svg';

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
      <div className={styles.formText}>
        <h3 className={styles.headText}>
          Не пропустите лучшие события недели!
        </h3>
        <p className={styles.subtext}>
          Один раз в неделю мы будем высылать вам на почту подборку самых
          популярных статей за прошедшую неделю!{' '}
        </p>
        <p className={styles.subtext}>Максимум пользы, за минимум времени!</p>
      </div>
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
            Политикой конфиденциальности
          </Link>
          .
        </p>
      </div>
      <button
        className={styles.alreadyButton}
        type="button"
        onClick={handleHideClick}
      >
        Я уже подписался
      </button>
      <img src={Background} alt="Фон" className={styles.imgBackground} />
      <img src={Line} alt="Линия" className={styles.line} />
      <img src={Man} alt="Котик и его человек" className={styles.man} />
      <img src={Arrow} alt="Стрелка" className={styles.arrow} />
    </section>
  );
};

export default Subscribe;
