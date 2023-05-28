import styles from './EventCard.module.css';

const EventCard = ({ event }) => {
  return (
    <li key={event.id} className={styles.li}>
      <img src={event.image} alt="event-" className={styles.image} />
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
