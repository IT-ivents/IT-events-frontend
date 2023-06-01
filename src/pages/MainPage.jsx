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
    else: false,
  },
  {
    id: 2,
    title: 'Популярное',
    list: popularEvents,
    else: true,
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
            key={list.id}
            title={list.title}
            elseButton={list.else}
          />
        ))}
      </div>
      <LeftFilerBar />
    </div>
  );
};

export default MainPage;
