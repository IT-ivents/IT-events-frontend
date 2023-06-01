import { useLocation } from 'react-router-dom';
import styles from './EventsList.module.css';
import EventCard from '../VerticalEventCard/VerticalEventCard';

const EventsList = ({ title, list, onCardClick }) => {
  const location = useLocation();

  return (
    <section className={`${styles.section}`}>
      {title && (
        <div className={styles.container}>
          <h2 className={styles.title}>{title}</h2>
        </div>
      )}
      <ul className={`${styles.list}`}>
        {list.map((event) => (
          <EventCard key={event.id} event={event} onCardClick={onCardClick} />
        ))}
      </ul>
    </section>
  );
};

export default EventsList;
