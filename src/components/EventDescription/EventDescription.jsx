import styles from './EventDescription.module.css';
import { useState } from 'react';
import DescriptionTabs from '../DescriptionTabs/DescriptionTabs';
import PrimaryButton from '../PrimaryButton/PrimaryButton';
import CalendarImage from '../../../src/images/EventInfo/calendar.svg';
import TimeImage from '../../../src/images/EventInfo/time.svg';
import PlaceImage from '../../../src/images/EventInfo/place.svg';
import LikeImage from './../../images/like-button.svg';
import LikeImageActive from './../../images/like-button_active.svg';
import ShareImage from './../../images/Actions/Share.svg';
import PopupLink from '../PopupLink/PopupLink';
import {
  formatDate,
  formatPrice,
  formatTimeRange,
  handleCopyLink,
} from '../../utils/helperFunctions';

const EventDescription = ({ selectedEvent, setSelectedEvent, onLikeClick }) => {
  const [showNotification, setShowNotification] = useState(false);

  const handleButtonClick = () => {
    const link = `${window.location.origin}/event/${selectedEvent.id}`;
    console.log('Ссылка скопирована в EventPage', link);
    //setSelectedEvent(selectedEvent);
    handleCopyLink(link, setShowNotification);
  };

  const handleLikeClick = () => {
    onLikeClick(selectedEvent);
  };

  const eventStartDate = formatDate(selectedEvent.date_start);
  const eventEndDate = formatDate(selectedEvent.date_end);
  const eventDate =
    eventStartDate === eventEndDate
      ? eventStartDate
      : `${eventStartDate} - ${eventEndDate}`;

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
          <img src={CalendarImage} alt="Календарь" className={styles.image} />
          {eventDate}
        </li>
        <li className={styles.eventDate}>
          <img src={TimeImage} alt="Время" className={styles.image} />
          {formatTimeRange(selectedEvent.date_start, selectedEvent.date_end)}
        </li>
        <li className={styles.eventDate}>
          <img
            src={PlaceImage}
            alt="Место проведения"
            className={styles.image}
          />
          {selectedEvent?.address ||
            'Нет данных' ||
            selectedEvent?.city ||
            'Нет данных'}
        </li>
        <li className={styles.eventPrice}>
          {formatPrice(selectedEvent.price)}
        </li>
      </ul>
      <PrimaryButton title="Сайт мероприятия" to={selectedEvent?.url} />
      <DescriptionTabs selectedEvent={selectedEvent} />
    </section>
  );
};

export default EventDescription;
