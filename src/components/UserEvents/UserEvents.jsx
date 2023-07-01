import React from 'react';
import styles from './UserEvents.module.css';
import VerticalEventList from '../VerticalEventList/VerticalEventList';

const UserEvents = ({ mostAnticipatedEvents }) => {
  return (
    <section className={styles.section}>
      <VerticalEventList events={mostAnticipatedEvents} />
    </section>
  );
};

export default UserEvents;
