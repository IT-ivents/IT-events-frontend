import styles from './Pages.module.css';
import HorizontalEventList from '../components/HorizontalEventList/HorizontalEventList';
import LeftFilerBar from '../components/LeftFilterBar/LeftFilterBar';
import Subscribe from '../components/Subscribe/Subscribe';
import SearchField from '../components/SearchField/SearchField';
import TopFilersBar from '../components/TopFilersBar/TopFilersBar';
import useScrollToTop from '../utils/hooks/useScrollToTop';

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

  const { isOnTopVisible, scrollToTop, footerHeight } = useScrollToTop(740);

  return (
    <div className={styles.mainPageWrapper}>
      <LeftFilerBar handleSearch={onSearch} />
      <div className={styles.mainPageListWrapper}>
        <div>
          <SearchField onSearch={onSearch} searchQuery={searchQuery} />
          <div className={styles.topFilterContainer}>
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

      {/* {ScrollToTopButton} */}
      <div className={styles.scrollContainer}>
        <button
          type="button"
          className={`${styles.onTop} ${isOnTopVisible ? styles.visible : ''}`}
          onClick={scrollToTop}
        ></button>
      </div>
    </div>
  );
};

export default MainPage;
