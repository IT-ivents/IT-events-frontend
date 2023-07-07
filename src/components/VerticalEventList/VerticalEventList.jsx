import { useEffect, useState } from 'react';
import styles from './VerticalEventList.module.css';
import HorizontalEventCard from '../HorizontalEventCard/HorizontalEventCard';
import EventCheckbox from '../EventCheckbox/EventCheckbox';
import { useLocation } from 'react-router-dom';
import { motion as m } from 'framer-motion';

const VerticalEventList = ({ title, onCardClick, onLikeClick, events }) => {
  const [checkedEvents, setCheckedEvents] = useState([]);

  const location = useLocation();
  const isCheckboxInvisible =
    location.pathname === '/notifications' ||
    location.pathname === '/account/events';

  const handleCheckboxChange = (event, isChecked) => {
    if (isChecked) {
      setCheckedEvents((prevCheckedEvents) => [...prevCheckedEvents, event]);
    } else {
      setCheckedEvents((prevCheckedEvents) =>
        prevCheckedEvents.filter((checkedEvent) => checkedEvent.id !== event.id)
      );
    }
  };

  useEffect(() => {
    console.log('TO_DEL_CHECKBOX', checkedEvents);
  }, [checkedEvents]);

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
              onLikeClick={(event) => onLikeClick(event)}
            />
          </div>
        ))}
      </ul>
    </section>
  );
};

export default VerticalEventList;
