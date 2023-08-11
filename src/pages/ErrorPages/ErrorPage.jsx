import React from 'react';
import styles from './ErrorPage.module.css';
import { Link } from 'react-router-dom';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton';

const ErrorPage = ({ title, subtitle }) => {
  return (
    <section className={styles.notFound}>
      <div className={styles.notInfo}>
        <h1 className={styles.notTitle}>{title}</h1>
        <div className={styles.notBlock}>
          <p className={styles.notText}>{subtitle}</p>
          <PrimaryButton title="На главную" to="/" />
          <p className={styles.notInterests}>
            Расскажите нам о своих интересах и мы подберём лучшие события
          </p>
          <Link to="/preferences" className={styles.notLink}>
            Настроить интересы
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
