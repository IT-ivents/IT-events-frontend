import styles from './Event.module.css';
import EventImage from '../../images/cat.jpg';
import EventDescription from '../EventDescription/EventDescription';
import EventsList from '../EventsList/EventsList';
import { interestingEvents } from '../../utils/constants/index';

function Event() {
  return (
    <div className={styles.eventContainer}>
      <EventDescription />
      <aside>
        <img className={styles.eventImage} src={EventImage} alt="Image" />
      </aside>
      <EventsList title="Смотрите также" list={interestingEvents} />
    </div>
  );
}

export default Event;
