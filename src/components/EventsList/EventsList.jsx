import { useLocation } from 'react-router-dom';
import styles from './EventsList.module.css';
import EventCard from '../EventCard/EventCard';
import ListSelector from '../ListSelector/ListSelector';

const EventsList = ({ title, list, onCardClick }) => {
  const location = useLocation();

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>{title}</h2>
        {location.pathname === '/' && <ListSelector />}
      </div>
      <ul className={styles.list}>
        {list.map((event) => (
          <EventCard key={event.id} event={event} onCardClick={onCardClick} />
        ))}
      </ul>
    </section>
  );
};

export default EventsList;
