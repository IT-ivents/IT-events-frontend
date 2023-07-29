import styles from './CustomEventCard.module.css';
import { formatDate, formatPrice } from '../../utils/helperFunctions';
import { useNavigate } from 'react-router-dom';
import PlaceImage from '../../images/EventInfo/place_white.svg';
import CalendarImage from '../../images/EventInfo/calendar_white.svg';

const CustomEventCard = ({ event, onCardClick }) => {
  const navigate = useNavigate();
  const handleCardClick = () => {
    onCardClick(event);
    navigate(`/events/${event.id}`);
  };

  return (
    <div key={event.id} className={`${styles.card}`} onClick={handleCardClick}>
      <div className={styles.imageContainer}>
        {event.format
          ?.filter((item) => item.name === 'Online')
          .map((item, index) => (
            <p key={index} className={styles.format}>
              <span className={styles.formatSpan}>
                {item.name.substring(0, 2)}
              </span>
              {item.name.substring(2)}
            </p>
          ))}

        <div className={styles.imageOverlay}>
          <div className={`${styles.descriptionContainer}`}>
            <span className={styles.price}>{formatPrice(event.price)}</span>
            <h3 className={styles.title}>{event.title}</h3>
            <ul className={styles.columnContainer}>
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
    </div>
  );
};

export default CustomEventCard;
