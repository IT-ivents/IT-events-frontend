import { useState } from 'react';
import styles from './HorizontalEventCard.module.css';
import { Link, useLocation } from 'react-router-dom';
import {
  parseEventDate,
  formatPrice,
  formatTimeRange,
} from '../../utils/helperFunctions';
import DefaultImage from '../../images/default-image.png';
import { ReactComponent as PlaceImage } from '../../images/EventInfo/place.svg';
import { ReactComponent as CalendarImage } from '../../images/EventInfo/calendar.svg';
import { ReactComponent as TimeImage } from '../../images/EventInfo/time.svg';
import { useEventsContext } from '../../utils/context/EventsContext';

const HorizontalEventCard = ({ event, onCardClick, onLikeClick, style }) => {
  const [imageError, setImageError] = useState(false);
  const { handleCardClick, toggleFavorite } = useEventsContext();
  const location = useLocation();

  // const handleCardClick = () => {
  //   onCardClick(event);
  // };

  const handleLikeClick = () => {
    onLikeClick(event);
  };

  const checkLocation = () => {
    if (location.pathname.includes('account')) {
      return `/events/${event.id}/edit`;
    } else {
      return `/events/${event.id}`;
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const eventStartDate = parseEventDate(event.date_start);
  const eventEndDate = parseEventDate(event.date_end);
  const eventDate =
    eventStartDate === eventEndDate
      ? eventStartDate
      : `${eventStartDate} - ${eventEndDate}`;

  return (
    <li key={event.id} className={`${styles.card}`}>
      <div className={styles.imageContainer}>
        <Link to={checkLocation()}>
          {imageError ? (
            <img
              src={DefaultImage}
              alt="Изображение отсутствует"
              className={styles.image}
              onClick={() => handleCardClick(event)}
            />
          ) : (
            <img
              src={event.image_small ? event.image_small : event.image}
              alt="event_picture"
              className={styles.image}
              onClick={() => handleCardClick(event)}
              onError={handleImageError}
            />
          )}
        </Link>
        {location.pathname !== '/account/events' && (
          <button
            className={`${
              event.isLiked ? styles.likeButtonActive : styles.likeButton
            }`}
            type="button"
            onClick={() => toggleFavorite(event)}
          ></button>
        )}
      </div>

      <div className={`${styles.descriptionContainer}`}>
        <div className={styles.titleContainer}>
          <h3 className={styles.title} style={style}>
            {event.title}
          </h3>
        </div>
        <ul className={styles.rowContainer}>
          <li className={styles.rowItem}>
            <CalendarImage />
            {/* <img src={CalendarImage} alt="Календарь" /> */}
            <time>{eventDate}</time>
          </li>
          <li className={styles.rowItem}>
            <TimeImage />
            {/* <img src={TimeImage} alt="Время" /> */}
            <time>{formatTimeRange(event.date_start, event.date_end)}</time>
          </li>
          <li className={styles.rowItem}>
            <PlaceImage />
            {/* <img src={PlaceImage} alt="Место проведения" /> */}
            {/* {renderLocationInfo(event)} */}
            <p>
              {event.city !== '' && event.city !== ' ' ? event.city : 'Online'}
            </p>
          </li>
          <li className={styles.rowItem}>
            <span className={styles.price}>{formatPrice(event.price)}</span>
          </li>
        </ul>
      </div>
    </li>
  );
};

export default HorizontalEventCard;
