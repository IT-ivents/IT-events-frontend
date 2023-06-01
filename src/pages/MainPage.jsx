import React from 'react';
import HorizontalEventList from '../components/HorizontalEventList/HorizontalEventList';
import { favoritesEvents, popularEvents } from '../utils/constants';

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
    <>
      {mainPageEvents.map((event) => (
        <HorizontalEventList
          key={event.id}
          title={event.title}
          list={event.list}
          elseButton={true}
          onCardClick={onCardClick}
        />
      ))}
    </>
  );
};

export default MainPage;
