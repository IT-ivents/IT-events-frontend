import styles from './HorizontalEventList.module.css';
import VerticalEventCard from '../VerticalEventCard/VerticalEventCard';
import ShowAllButton from '../ShowAllButton/ShowAllButton';

const HorizontalEventList = ({
  list,
  title,
  onCardClick,
  onLikeClick,
  elseButton,
}) => {
  console.log();

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
            onLikeClick={onLikeClick}
          />
        ))}
        {elseButton && <ShowAllButton />}
      </ul>
    </section>
  );
};

export default HorizontalEventList;
