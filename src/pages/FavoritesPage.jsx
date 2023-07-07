import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Pages.module.css';
import PageTitle from '../components/PageTitle/PageTitle';
import VerticalEventList from '../components/VerticalEventList/VerticalEventList';
import FilterBar from '../components/FilterBar/FilterBar';
import { parsePrice } from '../utils/helperFunctions';
import Loader from '../components/Loader/Loader';

const FavoritesPage = ({ onCardClick, onLikeClick, favoriteEvents }) => {
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [sortByName, setSortByName] = useState(true);
  const [sortByPrice, setSortByPrice] = useState(true);
  const [sortByDate, setSortByDate] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const noEvents = !favoriteEvents.length;

  useEffect(() => {
    setFilteredEvents(favoriteEvents);
  }, [favoriteEvents]);

  const handleFilter = (option) => {
    let sortedList = [...filteredEvents];

    switch (option) {
      case 'name':
        sortedList.sort((a, b) => {
          const sortOrder = sortByName ? 1 : -1;
          return sortOrder * a.title.localeCompare(b.title);
        });
        setSortByName((prevValue) => !prevValue);
        break;
      case 'price':
        sortedList.sort((a, b) => {
          const sortOrder = sortByPrice ? 1 : -1;
          if (a.price === b.price) {
            const dateA = new Date(a.date_start).getTime();
            const dateB = new Date(b.date_start).getTime();
            return (dateA - dateB) * sortOrder;
          } else if (a.price === 'Бесплатно' || b.price === 'Бесплатно') {
            return a.price === 'Бесплатно' ? -1 * sortOrder : 1 * sortOrder;
          } else {
            const priceA = parsePrice(a.price);
            const priceB = parsePrice(b.price);
            return (priceA - priceB) * sortOrder;
          }
        });
        setSortByPrice((prevValue) => !prevValue);
        break;
      case 'date':
        sortedList.sort((a, b) => {
          const sortOrder = sortByDate ? 1 : -1;
          const dateA = new Date(a.date_start).getTime();
          const dateB = new Date(b.date_start).getTime();
          return (dateA - dateB) * sortOrder;
        });
        setSortByDate((prevValue) => !prevValue);
        break;
      default:
        break;
    }

    setFilteredEvents([...sortedList]);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 750);
  }, []);

  return (
    <section className={styles.favoritesPageWrapper}>
      {isLoading && !noEvents ? (
        <Loader />
      ) : (
        <>
          <PageTitle title="Избранное" subtitle="Сохраненные мероприятия" />
          <FilterBar onFilter={handleFilter} />
          <div className={styles.divider} />
          {noEvents && (
            <div className={styles.noFavoritesContainer}>
              <h3 className={styles.noFavoritesText}>Список пуст</h3>
              <p className={styles.noFavoritesDesc}>
                Вы пока ничего не сохранили в избранное, но вы можете начать
                пополнять свой список избранного прямо сейчас. Для этого
                воспользуйтесь поиском на нашем сайте и найдите интересующие вас
                события.
              </p>
              <Link className={styles.noFavoritesLink} to="/">
                Начать поиск
              </Link>
            </div>
          )}
          <div className={styles.favoritesPageListContainer}>
            <VerticalEventList
              events={filteredEvents}
              onCardClick={onCardClick}
              onLikeClick={onLikeClick}
            />
          </div>
        </>
      )}
    </section>
  );
};

export default FavoritesPage;
