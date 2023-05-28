import React from 'react';
import styles from './MainAppSection.module.css';

const MainAppSection = ({ children }) => {
  const headText = 'Не пропусти главные события IT';
  const subtext = 'Сотни ивентов уже ждут тебя. И мы собрали их все';
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h1 className={styles.headText}>{headText}</h1>
        <p className={styles.subText}>{subtext}</p>
      </div>
      {children}
    </section>
  );
};

export default MainAppSection;
