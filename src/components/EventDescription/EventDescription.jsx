import styles from './EventDescription.module.css';
import DescriptionTabs from '../DescriptionTabs/DescriptionTabs';
import PlayImage from '../../images/play.png';
import ShareImage from '../../images/share.png';
import LikeImage from '../../images/like.png';

const EventDescription = ({ selectedEvent }) => {
  return (
    <section className={styles.eventDescription}>
      <header className={styles.eventHeader}>
        <h1 className={styles.eventName}>{selectedEvent.title}</h1>
        <figure className={styles.eventFigure}>
          <img src={ShareImage} alt="Share" />
        </figure>
        <figure className={styles.eventFigure}>
          <img src={LikeImage} alt="Like" />
        </figure>
      </header>
      <ul className={styles.eventDates}>
        <li className={styles.eventDate}>{selectedEvent.date}</li>
        <li className={styles.eventDate}>10:00–20:00</li>
        <li className={styles.eventDate}>{selectedEvent.location}</li>
      </ul>
      <figure className={styles.eventFigure}>
        <img src={PlayImage} alt="Play" />
        <figcaption>Online-трансляция</figcaption>
      </figure>
      <p className={styles.eventPrice}>{selectedEvent.price}</p>
      <button className={styles.eventButton}>
        Перейти на сайт организатора
      </button>

      <DescriptionTabs />
    </section>
  );
};

export default EventDescription;
