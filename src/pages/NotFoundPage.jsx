import React from 'react';
import styles from './Pages.module.css';
import { Link } from 'react-router-dom';
import PrimaryButton from './../components/PrimaryButton/PrimaryButton';

const NotFoundPage = () => {
  return (
    <section className={styles.notSection}>
      <div className={styles.notFound}>
        <h1 className={styles.notTitle}>404. Такой страницы на сайте нет</h1>
        <div className={styles.notBlock}>
          <p className={styles.notText}>
            С этой страницей что-то случилось или не верно указан адрес
          </p>
          <Link to="/" className={styles.notText}>
            <PrimaryButton title="На главную" />
          </Link>
          <p>Расскажите нам о своих интересах и мы подберём лучшие события</p>
          <Link to="/preferences" className={styles.notLink}>
            Что вам интересно?
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
