import styles from './Pages.module.css';
import DividerLine from '../components/DividerLine/DividerLine';
import PageTitle from '../components/PageTitle/PageTitle';
import VerticalEventList from '../components/VerticalEventList/VerticalEventList';
//import { favoritesEvents } from '../utils/constants';

const FavoritesPage = ({ onCardClick, onLikeClick, favoriteEvents }) => {
  return (
    <>
      <DividerLine />
      <section className={styles.favoritesPageWrapper}>
        <PageTitle title="Избранное" subtitle="Сохраненные мероприятия" />
        <VerticalEventList
          favoriteEvents={favoriteEvents}
          onCardClick={onCardClick}
          onLikeClick={onLikeClick}
        />
      </section>
    </>
  );
};

export default FavoritesPage;
