import React from 'react';
import MainAppSection from '../components/MainAppSection/MainAppSection';
import SearchField from '../components/SearchField/SearchField';
import FilterBar from '../components/FilterBar/FilterBar';
import EventsList from '../components/EventsList/EventsList';
import {
  popularEvents,
  immediateEvents,
  interestingEvents,
} from '../utils/constants';

const MainPage = ({ onCardClick }) => {
  return (
    <>
      <MainAppSection>
        <SearchField />
      </MainAppSection>
      <FilterBar />

      <EventsList
        title="Популярное"
        list={popularEvents}
        onCardClick={onCardClick}
      />
      <EventsList
        title="Ближайшие события"
        list={immediateEvents}
        onCardClick={onCardClick}
      />
      <EventsList
        title="Может быть интересно"
        list={interestingEvents}
        onCardClick={onCardClick}
      />
    </>
  );
};

export default MainPage;
