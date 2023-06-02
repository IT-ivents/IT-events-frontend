import React from 'react';
import HorizontalEventList from '../components/HorizontalEventList/HorizontalEventList';
import LeftFilerBar from '../components/LeftFilterBar/LeftFilterBar';
import { mainEvents } from '../utils/constants';

import styles from './Pages.module.css'; ///////////////

const MainPage = ({ onCardClick, onLikeClick, allEvents }) => {
  const mainPageEvents = [
    {
      id: 1,
      title: 'Самые ожидаемые события года',
      list: allEvents,
      else: false,
    },
  ];

  return (
    <div className={styles.mainPageWrapper}>
      <div className={styles.listWrapper}>
        {mainPageEvents.map((event) => (
          <HorizontalEventList
            key={event.id}
            list={event.list}
            title={event.title}
            onCardClick={onCardClick}
            onLikeClick={onLikeClick}
            elseButton={event.else}
          />
        ))}
      </div>
      <LeftFilerBar />
    </div>
  );
};

export default MainPage;
