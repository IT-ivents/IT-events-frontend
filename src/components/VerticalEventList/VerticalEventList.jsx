import styles from './VerticalEventList.module.css';
import HorizontalEventCard from '../HorizontalEventCard/HorizontalEventCard';

const VerticalEventList = ({
  title,
  favoriteEvents,
  onCardClick,
  onLikeClick,
}) => {
  return (
    <section className={`${styles.section}`}>
      {title && (
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>{title}</h2>
        </div>
      )}
      <ul className={`${styles.list}`}>
        {favoriteEvents.map((event) => (
          <HorizontalEventCard
            key={event.id}
            isLiked={event.isLiked}
            event={event}
            onCardClick={onCardClick}
            onLikeClick={(event) => onLikeClick(event)}
          />
        ))}
      </ul>
    </section>
  );
};

export default VerticalEventList;
