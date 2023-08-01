import styles from './Pages.module.css';
import PageTitle from '../components/PageTitle/PageTitle';
import VerticalEventList from '../components/VerticalEventList/VerticalEventList';
import CustomCheckbox from '../components/CustomCheckbox/CustomCheckbox';
import { useEventsContext } from '../utils/context/EventsContext';

const NotificationsPage = () => {
  const filters = ['Название', 'Cтоимость', 'Город', 'Формат'];
  const { favoriteEvents } = useEventsContext();

  return (
    <section className={styles.notificationsPageWrapper}>
      <PageTitle
        title="Уведомления"
        subtitle="Здесь вы видите интересные события, которые вы указали в списке интересных тем."
      />
      <div className={styles.filterField}>
        <CustomCheckbox padding="0" />
        <span className={styles.filterSpan}>Все</span>
        <ul className={styles.filterList}>
          {filters.map((filter, index) => (
            <li key={index} className={styles.filterItem}>
              {filter}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <VerticalEventList
          events={favoriteEvents}
          onCardClick={() => {}}
          onLikeClick={() => {}}
        />
      </div>
    </section>
  );
};

export default NotificationsPage;
