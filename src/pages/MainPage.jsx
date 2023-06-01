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

const mainPageEvents = [
  {
    id: 1,
    title: 'Популярное',
    list: popularEvents,
  },
  {
    id: 2,
    title: 'Ближайшие события>',
    list: immediateEvents,
  },
  {
    id: 3,
    title: 'Может быть интересно',
    list: interestingEvents,
  },
];

const MainPage = ({ onCardClick }) => {
  return (
    <>
      <MainAppSection>
        <SearchField />
      </MainAppSection>
      <FilterBar justify={'center'} />
      {mainPageEvents.map((event) => (
        <EventsList
          list={event.list}
          title={event.title}
          onCardClick={onCardClick}
          listDirection={'row'}
          sectionFlex={'column'}
          key={event.id}
        />
      ))}

      {/* <EventsList
        title="Популярное"
        list={popularEvents}
        onCardClick={onCardClick}
        listDirection={'row'}
        sectionFlex={'column'}
      />
      <EventsList
        title="Ближайшие события"
        list={immediateEvents}
        onCardClick={onCardClick}
        listDirection={'row'}
        sectionFlex={'column'}
      />
      <EventsList
        title="Может быть интересно"
        list={interestingEvents}
        onCardClick={onCardClick}
        listDirection={'row'}
        sectionFlex={'column'}
      /> */}
    </>
  );
};

export default MainPage;
