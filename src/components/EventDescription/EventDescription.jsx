import styles from './EventDescription.module.css';
import { useState } from 'react';
import DescriptionTabs from '../DescriptionTabs/DescriptionTabs';
import PrimaryButton from '../PrimaryButton/PrimaryButton';
import CalendarImage from '../../images/EventInfo/calendar.svg';
import TimeImage from '../../images/EventInfo/time.svg';
import PlaceImage from '../../images/EventInfo/place.svg';
import LikeImage from '../../images/like-button.svg';
import LikeImageActive from '../../images/like-button_active.svg';
import ShareImage from '../../images/Actions/Share.svg';
import PopupLink from '../PopupLink/PopupLink';
import {
  formatDate,
  formatPrice,
  formatTimeRange,
  handleCopyLink,
} from '../../utils/helperFunctions';

const EventDescription = ({ selectedEvent, onLikeClick }) => {
  const [showNotification, setShowNotification] = useState(false);

  const handleButtonClick = () => {
    const link = selectedEvent?.url;
    handleCopyLink(link, setShowNotification);
  };

  const handleLikeClick = () => {
    onLikeClick(selectedEvent);
  };

  return (
    <section className={styles.eventDescription}>
      <header className={styles.eventHeader}>
        {showNotification && <PopupLink top="55px" right="-100px" />}
        <h1 className={styles.eventName}>{selectedEvent.title}</h1>
        <div className={styles.eventFigures}>
          <figure className={styles.eventFigure}>
            <img
              src={selectedEvent.isLiked ? LikeImageActive : LikeImage}
              alt="Like"
              onClick={handleLikeClick}
            />
          </figure>
          <figure className={styles.eventFigure} onClick={handleButtonClick}>
            <img src={ShareImage} alt="Share" />
          </figure>
        </div>
      </header>
      <ul className={styles.eventDates}>
        <li className={styles.eventDate}>
          <img src={CalendarImage} alt="Календарь" />
          {formatDate(selectedEvent.date_start)}
        </li>
        <li className={styles.eventDate}>
          <img src={TimeImage} alt="Время" />
          {formatTimeRange(selectedEvent.date_start, selectedEvent.date_end)}
        </li>
        <li className={styles.eventDate}>
          <img src={PlaceImage} alt="Место проведения" />
          {selectedEvent?.address?.split(' ').slice(0, 9).join(' ') ||
            selectedEvent?.city?.name ||
            'Нет данных'}
        </li>
        <li className={styles.eventPrice}>
          {formatPrice(selectedEvent.price)}
        </li>
      </ul>
      <PrimaryButton
        title="Перейти на сайт организатора"
        to={selectedEvent?.url}
      />
      <DescriptionTabs selectedEvent={selectedEvent} />
    </section>
  );
};

export default EventDescription;
