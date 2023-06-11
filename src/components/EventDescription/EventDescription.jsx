import styles from './EventDescription.module.css';
import DescriptionTabs from '../DescriptionTabs/DescriptionTabs';
import PrimaryButton from '../PrimaryButton/PrimaryButton';
import playIcon from '../../images/Actions/PlayCircle.svg';
import LikeImage from '../../images/like-button.svg';
import LikeImageActive from '../../images/like-button_active.svg';
import ShareImage from '../../images/Actions/Share.svg';
import { formatDate, formatPrice } from '../../utils/helperFunctions';

const EventDescription = ({ selectedEvent, onLikeClick }) => {
  const handleLikeClick = () => {
    onLikeClick(selectedEvent);
  };
  return (
    <section className={styles.eventDescription}>
      <header className={styles.eventHeader}>
        <h1 className={styles.eventName}>{selectedEvent.title}</h1>
        <div className={styles.eventFigures}>
          <figure className={styles.eventFigure}>
            <img
              src={selectedEvent.isLiked ? LikeImageActive : LikeImage}
              alt="Like"
              onClick={handleLikeClick}
            />
          </figure>
          <figure className={styles.eventFigure}>
            <img src={ShareImage} alt="Share" />
          </figure>
        </div>
      </header>
      <ul className={styles.eventDates}>
        <li className={styles.eventDate}>{formatDate(selectedEvent.date)}</li>
        <li className={styles.eventDate}>10:00–20:00</li>
        <li className={styles.eventDate}>{selectedEvent.location}</li>
      </ul>
      <figure className={styles.eventFigure}>
        <img src={playIcon} alt="Play" />
        <figcaption>Online-трансляция</figcaption>
      </figure>
      <p className={styles.eventPrice}>{formatPrice(selectedEvent.price)}</p>
      <PrimaryButton
        title="Перейти на сайт организатора"
        to={selectedEvent?.url}
      />
      <DescriptionTabs selectedEvent={selectedEvent} />
    </section>
  );
};

export default EventDescription;
