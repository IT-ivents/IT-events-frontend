import styles from './EventCard.module.css';
import { Link } from 'react-router-dom';

const EventCard = ({ event, onCardClick }) => {
  const handleCardClick = () => {
    onCardClick(event);
  };

  return (
    <li key={event.id} className={styles.li}>
      <Link to="/event" onClick={handleCardClick}>
        <img src={event.image} alt="event_picture" className={styles.image} />
      </Link>
      <div className={styles.buttonContainer}>
        <button className={styles.likeButton}></button>
      </div>
      <div className={styles.container}>
        <h3 className={styles.title}>{event.title}</h3>
        <p className={styles.location}>{event.location}</p>
        <time className={styles.date}>{event.date}</time>
        <span className={styles.price}>{event.price}</span>
      </div>
    </li>
  );
};

export default EventCard;
