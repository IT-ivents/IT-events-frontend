import React from 'react';
import styles from './UserEvents.module.css';
import FilterBar from '../FilterBar/FilterBar';
import VerticalEventList from '../VerticalEventList/VerticalEventList';
import AddImage from '../../images/Actions/Add.svg';

const UserEvents = ({ mostAnticipatedEvents }) => {
  const pageRender = () => {
    if (mostAnticipatedEvents.length === 0 || !mostAnticipatedEvents) {
      return (
        <>
          <h2 className={styles.title}>У Вас пока нет созданных событий</h2>
          <p className={styles.subtitle}>
            Вы можете добавить новое событие в любое время
          </p>
        </>
      );
    } else {
      return <VerticalEventList events={mostAnticipatedEvents} />;
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.filterBar}>
        <FilterBar />
        <div className={styles.buttons}>
          <button type="button" className={styles.delete}></button>
          <button title="Создать событие" className={styles.create}>
            <img src={AddImage} alt="Создать событие" />
            Создать событие
          </button>
        </div>
      </div>
      {pageRender()}
    </section>
  );
};

export default UserEvents;
