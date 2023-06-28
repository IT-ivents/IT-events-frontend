import styles from './Pages.module.css';
import HorizontalEventList from '../components/HorizontalEventList/HorizontalEventList';
import LeftFilerBar from '../components/LeftFilterBar/LeftFilterBar';
import Subscribe from '../components/Subscribe/Subscribe';
import SearchField from '../components/SearchField/SearchField';
import TopFilersBar from '../components/TopFilersBar/TopFilersBar';
import ScrollToTopButton from '../components/ScrollToTopButton/ScrollToTopButton';
import EventCarousel from '../components/EventCarousel/EventCarousel';

const MainPage = ({
  onCardClick,
  onLikeClick,
  popularEvents,
  interestingEvents,
  mostAnticipatedEvents,
  soonEvents,
  onSearch,
  searchQuery,
}) => {
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

  return (
    <div className={styles.mainPageWrapper}>
      <LeftFilerBar handleSearch={onSearch} />
      <div className={styles.mainPageListWrapper}>
        <div>
          <SearchField onSearch={onSearch} searchQuery={searchQuery} />
          <div className={styles.topFilterContainer}>
            <TopFilersBar />
          </div>
          <div>
            <EventCarousel
              mostAnticipatedEvents={mostAnticipatedEvents}
              onCardClick={onCardClick}
            />
            {mainPageEvents.map((event) => (
              <HorizontalEventList
                key={event.id}
                list={event.list}
                title={event.title}
                span={event.span}
                onCardClick={onCardClick}
                onLikeClick={onLikeClick}
                elseButton={event.else}
                eventOnPage={event.eventOnPage}
              />
            ))}
          </div>
        </div>
      </div>
      <Subscribe />
      <ScrollToTopButton />
    </div>
  );
};

export default MainPage;
