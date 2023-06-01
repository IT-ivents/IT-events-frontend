import React from 'react';
import HorizontalEventList from '../components/HorizontalEventList/HorizontalEventList';
import LeftFilerBar from '../components/LeftFilterBar/LeftFilterBar';
import { favoritesEvents, popularEvents } from '../utils/constants';

import styles from './Pages.module.css'; ///////////////

const mainPageEvents = [
  {
    id: 1,
    title: 'Самые ожидаемые события года',
    list: favoritesEvents,
  },
  {
    id: 2,
    title: 'Популярное',
    list: popularEvents,
  },
];

const MainPage = ({ onCardClick }) => {
  return (
    <div className={styles.mainPageWrapper}>
      <div className={styles.listWrapper}>
        {mainPageEvents.map((list) => (
          <HorizontalEventList
            list={list.list}
            onCardClick={onCardClick}
            key={list.key}
            title={list.title}
          />
        ))}
      </div>
      <LeftFilerBar />
    </div>
  );
};

export default MainPage;
