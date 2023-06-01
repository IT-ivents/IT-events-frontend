import styles from './Pages.module.css';
import DividerLine from '../components/DividerLine/DividerLine';
import PageTitle from '../components/PageTitle/PageTitle';
import VerticalEventList from '../components/VerticalEventList/VerticalEventList';
import { favoritesEvents } from '../utils/constants';

const FavoritesPage = ({ onCardClick }) => {
  return (
    <>
      <DividerLine />
      <section className={styles.favoritesPageWrapper}>
        <PageTitle title="Избранное" subtitle="Сохраненные мероприятия" />
        <VerticalEventList list={favoritesEvents} onCardClick={onCardClick} />
      </section>
    </>
  );
};

export default FavoritesPage;
