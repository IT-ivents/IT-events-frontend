import styles from './VerticalEventList.module.css';
import HorizontalEventCard from '../HorizontalEventCard/HorizontalEventCard';

const VerticalEventList = ({ title, list, onCardClick }) => {
  return (
    <section className={`${styles.section}`}>
      {title && (
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>{title}</h2>
        </div>
      )}
      <ul className={`${styles.list}`}>
        {list.map((event) => (
          <HorizontalEventCard
            key={event.id}
            event={event}
            onCardClick={onCardClick}
          />
        ))}
      </ul>
    </section>
  );
};

export default VerticalEventList;
