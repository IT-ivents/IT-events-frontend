import styles from './VerticalEventList.module.css';
import HorizontalEventCard from '../HorizontalEventCard/HorizontalEventCard';
import CustomCheckbox from '../CustomCheckbox/CustomCheckbox';
import { useLocation } from 'react-router-dom';
import { motion as m } from 'framer-motion';

const VerticalEventList = ({ title, onCardClick, onLikeClick, events }) => {
  const location = useLocation();
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
            {location.pathname === '/notifications' && (
              <CustomCheckbox position="none" />
            )}
            <HorizontalEventCard
              key={event.id}
              isLiked={event.isLiked}
              event={event}
              onCardClick={onCardClick}
              onLikeClick={(event) => onLikeClick(event)}
            />
          </div>
        ))}
      </ul>
    </section>
  );
};

export default VerticalEventList;
