import React from 'react';
import styles from './UserEvents.module.css';
import FilterBar from '../FilterBar/FilterBar';
import VerticalEventList from '../VerticalEventList/VerticalEventList';

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
      <FilterBar />
      {pageRender()}
    </section>
  );
};

export default UserEvents;
