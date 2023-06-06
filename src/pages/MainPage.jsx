import React from 'react';
import styles from './Pages.module.css';
import HorizontalEventList from '../components/HorizontalEventList/HorizontalEventList';
import LeftFilerBar from '../components/LeftFilterBar/LeftFilterBar';
import Subscribe from '../components/Subscribe/Subscribe';

const MainPage = ({
  onCardClick,
  onLikeClick,
  popularEvents,
  interestingEvents,
  mostAnticipatedEvents,
  soonEvents,
}) => {
  const mainPageEvents = [
    {
      id: 1,
      title: 'Самые ожидаемые события года',
      list: mostAnticipatedEvents,
      else: false,
      span: false,
    },
    {
      id: 2,
      title: 'Популярное',
      list: popularEvents,
      else: true,
      span: false,
    },
    {
      id: 3,
      title: 'Ближайшие события>',
      list: soonEvents,
      else: true,
      span: false,
    },
    {
      id: 4,
      title: 'Это интересно',
      list: interestingEvents,
      else: true,
      span: true,
    },
  ];

  return (
    <div className={styles.mainPageWrapper}>
      <div className={styles.mainPageListWrapper}>
        {mainPageEvents.map((event) => (
          <HorizontalEventList
            key={event.id}
            list={event.list}
            title={event.title}
            span={event.span}
            onCardClick={onCardClick}
            onLikeClick={onLikeClick}
            elseButton={event.else}
          />
        ))}
        <Subscribe />
      </div>
      <LeftFilerBar />
    </div>
  );
};

export default MainPage;
