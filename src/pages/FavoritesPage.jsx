import EventsList from '../components/EventsList/EventsList';
import FilterBar from '../components/FilterBar/FilterBar';
import { favoritesEvents } from '../utils/constants';

const FavoritesPage = ({ onCardClick }) => {
  return (
    <>
      <FilterBar />
      <EventsList list={favoritesEvents} onCardClick={onCardClick} />
    </>
  );
};

export default FavoritesPage;
