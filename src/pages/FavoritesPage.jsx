import EventsList from '../components/EventsList/EventsList';
import FilterBar from '../components/FilterBar/FilterBar';
import PageTitle from '../components/PageTitle/PageTitle';
import { favoritesEvents } from '../utils/constants';

const FavoritesPage = ({ onCardClick }) => {
  return (
    <>
      <PageTitle title="Избранное" subtitle="Сохраненные мероприятия" />
      <FilterBar />
      <EventsList list={favoritesEvents} onCardClick={onCardClick} />
    </>
  );
};

export default FavoritesPage;
