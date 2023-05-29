import EventsList from '../components/EventsList/EventsList';
import FilterBar from '../components/FilterBar/FilterBar';
import PageTitle from '../components/PageTitle/PageTitle';
import { favoritesEvents } from '../utils/constants';

const FavoritesPage = ({ onCardClick }) => {
  return (
    <>
      <PageTitle title="Избранное" subtitle="Сохраненные мероприятия" />
      <FilterBar justify={'left'} />
      <EventsList
        list={favoritesEvents}
        onCardClick={onCardClick}
        listDirection={'column'}
      />
    </>
  );
};

export default FavoritesPage;
