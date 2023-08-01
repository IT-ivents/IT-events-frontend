import styles from './VerticalEventList.module.css';
import HorizontalEventCard from '../HorizontalEventCard/HorizontalEventCard';
import EventCheckbox from '../EventCheckbox/EventCheckbox';

const VerticalEventList = ({
  title,
  onCardClick,
  onLikeClick,
  events,
  checkedEvents,
  handleCheckboxChange,
  isCheckboxInvisible,
  style,
}) => {
  return (
    <section className={`${styles.section}`}>
      {title && (
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>{title}</h2>
        </div>
      )}
      <ul className={`${styles.list}`}>
        {events?.map((event, index) => (
          <div key={index} className={styles.listContainer}>
            {isCheckboxInvisible && (
              <EventCheckbox
                event={event}
                checked={checkedEvents.includes(event)}
                onCheckboxChange={handleCheckboxChange}
              />
            )}
            <HorizontalEventCard
              key={event.id}
              isLiked={event.isLiked}
              event={event}
              onCardClick={onCardClick}
              onLikeClick={onLikeClick}
              style={style}
            />
          </div>
        ))}
      </ul>
    </section>
  );
};

export default VerticalEventList;
