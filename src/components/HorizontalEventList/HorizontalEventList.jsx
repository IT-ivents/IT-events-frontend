import styles from './HorizontalEventList.module.css';
import VerticalEventCard from '../VerticalEventCard/VerticalEventCard';

const HorizontalEventList = ({ list, title, onCardClick, elseButton }) => {
  return (
    <section className={`${styles.section}`}>
      {title && (
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>{title}</h2>
        </div>
      )}
      <ul className={`${styles.list}`}>
        {list.map((event) => (
          <VerticalEventCard
            key={event.id}
            event={event}
            onCardClick={onCardClick}
          />
        ))}
        {elseButton && (
          <button className={styles.elseButton} type="button">
            Показать все
          </button>
        )}
      </ul>
    </section>
  );
};

export default HorizontalEventList;
