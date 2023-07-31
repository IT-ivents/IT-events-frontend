import styles from './Pages.module.css';
import { useEffect, useState } from 'react';
import { useEventsContext } from '../utils/context/EventsContext';
import HorizontalEventList from '../components/HorizontalEventList/HorizontalEventList';
import LeftFilerBar from '../components/LeftFilterBar/LeftFilterBar';
import Subscribe from '../components/Subscribe/Subscribe';
import SearchField from '../components/SearchField/SearchField';
import TopFilersBar from '../components/TopFilersBar/TopFilersBar';
import ScrollToTopButton from '../components/ScrollToTopButton/ScrollToTopButton';
import EventCarousel from '../components/EventCarousel/EventCarousel';
import Loader from '../components/Loader/Loader';

const MainPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const {
    popularEvents,
    soonEvents,
    interestingEvents,
    mostAnticipatedEvents,
    handleCardClick,
    toggleFavorite,
  } = useEventsContext();

  const mainPageEvents = [
    // {
    //   id: 1,
    //   title: 'Самые ожидаемые события года',
    //   list: mostAnticipatedEvents,
    //   else: false,
    //   span: false,
    // },
    {
      id: 2,
      title: 'Популярное',
      list: popularEvents,
      else: true,
      eventOnPage: 6,
    },
    {
      id: 3,
      title: 'Ближайшие события',
      list: soonEvents,
      else: true,
      eventOnPage: 6,
    },
    {
      id: 4,
      title: 'Это интересно',
      list: interestingEvents,
      else: true,
      span: true,
      eventOnPage: 9,
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <div className={styles.mainPageWrapper}>
      <LeftFilerBar />
      <div className={styles.mainPageListWrapper}>
        <div>
          <SearchField />
          <TopFilersBar />
          {isLoading ? (
            <Loader />
          ) : (
            <div>
              <EventCarousel
                mostAnticipatedEvents={mostAnticipatedEvents}
                onCardClick={handleCardClick}
              />
              {mainPageEvents.map((event) => (
                <HorizontalEventList
                  key={event.id}
                  list={event.list}
                  title={event.title}
                  span={event.span}
                  elseButton={event.else}
                  eventOnPage={event.eventOnPage}
                  onCardClick={handleCardClick}
                  onLikeClick={toggleFavorite}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <Subscribe />
      <ScrollToTopButton />
    </div>
  );
};

export default MainPage;
