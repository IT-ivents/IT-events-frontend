import React from 'react';
import styles from './Pages.module.css';
import HorizontalEventList from '../components/HorizontalEventList/HorizontalEventList';
import LeftFilerBar from '../components/LeftFilterBar/LeftFilterBar';
import Subscribe from '../components/Subscribe/Subscribe';
import SearchField from '../components/SearchField/SearchField';
import TopFilersBar from '../components/TopFilersBar/TopFilersBar';

const MainPage = ({
  onCardClick,
  onLikeClick,
  popularEvents,
  interestingEvents,
  mostAnticipatedEvents,
  soonEvents,
  handleSearch,
  searchQuery,
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
      title: 'Ближайшие события',
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
      <LeftFilerBar handleSearch={handleSearch} searchQuery />
      <div className={styles.mainPageListWrapper}>
        <div>
          <div className={styles.topFilterContainer}>
            <SearchField />
            <TopFilersBar />
          </div>
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
        </div>
      </div>
      <Subscribe />
    </div>
  );
};

export default MainPage;
