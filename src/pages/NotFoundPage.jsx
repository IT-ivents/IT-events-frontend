import React from 'react';
import styles from './Pages.module.css';
import Empty from './../images/404.svg';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <>
      <img src={Empty} alt="Emptiness" />
      <h1 className={styles.notTitle}>Такой страницы на сайте нет</h1>
      <p className={styles.notText}>Но у нас много интересных событий на</p>
      <Link to="/" className={styles.notText}>
        Главной странице
      </Link>
    </>
  );
};

export default NotFoundPage;
