import { useState, useEffect } from 'react';
import styles from './Pages.module.css';
import PageTitle from '../components/PageTitle/PageTitle';
import VerticalEventList from '../components/VerticalEventList/VerticalEventList';
import FilterBar from '../components/FilterBar/FilterBar';
import { parseDate, parsePrice } from '../utils/helperFunctions';

const FavoritesPage = ({ onCardClick, onLikeClick, favoriteEvents }) => {
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [sortByName, setSortByName] = useState(true);
  const [sortByPrice, setSortByPrice] = useState(true);
  const [sortByDate, setSortByDate] = useState(true);

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
          if (a.price === 'Бесплатно' || b.price === 'Бесплатно') {
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
          const dateA = parseDate(a.date);
          const dateB = parseDate(b.date);
          return (dateA - dateB) * sortOrder;
        });
        setSortByDate((prevValue) => !prevValue);
        break;
      default:
        break;
    }

    setFilteredEvents([...sortedList]);
  };

  return (
    <section className={styles.favoritesPageWrapper}>
      <PageTitle title="Избранное" subtitle="Сохраненные мероприятия" />
      <FilterBar onFilter={handleFilter} />
      <div className={styles.favoritesPageListContainer}>
        <VerticalEventList
          events={filteredEvents}
          onCardClick={onCardClick}
          onLikeClick={onLikeClick}
        />
      </div>
    </section>
  );
};

export default FavoritesPage;
