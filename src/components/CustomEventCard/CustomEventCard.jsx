import styles from './CustomEventCard.module.css';
import { formatDate, formatPrice } from '../../utils/helperFunctions';
import PlaceImage from '../../images/EventInfo/place_white.svg';
import CalendarImage from '../../images/EventInfo/calendar_white.svg';

const CustomEventCard = ({ event, onCardClick }) => {
  const handleCardClick = () => {
    onCardClick(event);
  };

  return (
    <li key={event.id} className={`${styles.card}`} onClick={handleCardClick}>
      <div className={styles.imageContainer}>
        <div className={styles.imageOverlay}>
          <div className={`${styles.descriptionContainer}`}>
            <h3 className={styles.title}>{event.title}</h3>
            <ul className={styles.rowContainer}>
              <li className={styles.rowItem}>
                <img
                  src={CalendarImage}
                  alt="календарь"
                  style={{ color: 'white' }}
                />
                <time>{formatDate(event.date_start)}</time>
              </li>
              {event.city?.name && (
                <li className={styles.rowItem}>
                  <img src={PlaceImage} alt="локация" />
                  <p>{event.city?.name || 'Город неизвестен'}</p>
                </li>
              )}
              {event.format
                .filter((item) => item.name === 'Online')
                .map((item, index) => (
                  <li key={index} className={styles.rowItem}>
                    <p className={styles.format}>{item.name}</p>
                  </li>
                ))}
              <span className={styles.price}>{formatPrice(event.price)}</span>
            </ul>
            {/* <ul className={styles.tagsList}>
              {event.tags.slice(0, 3).map((tag) => (
                <li key={tag.slug} className={styles.tag}>
                  <span className={styles.span}>#</span>
                  {tag.name}
                </li>
              ))}
            </ul> */}
          </div>
        </div>
        <img
          src={event.image ? event.image : ''}
          alt="event_picture"
          className={styles.image}
        />
      </div>
    </li>
  );
};

export default CustomEventCard;
