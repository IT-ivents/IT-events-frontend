import SearchField from '../components/SearchField/SearchField';
import DividerLine from '../components/DividerLine/DividerLine';
import VerticalEventList from '../components/VerticalEventList/VerticalEventList';

//import PageTitle from '../components/PageTitle/PageTitle';
import { favoritesEvents } from '../utils/constants';

const FavoritesPage = ({ onCardClick }) => {
  return (
    <>
      <SearchField />
      <DividerLine />
      <VerticalEventList
        list={favoritesEvents}
        title={'Избранное'}
        onCardClick={onCardClick}
      />
    </>
  );
};

export default FavoritesPage;
