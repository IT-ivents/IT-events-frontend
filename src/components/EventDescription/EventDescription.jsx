import styles from './EventDescription.module.css';
import PlayImage from '../../images/play.png';
import ShareImage from '../../images/share.png';
import LikeImage from '../../images/like.png';

function EventDescription({ selectedEvent }) {
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

      {/* Тут будут <Tab /> */}
      <section className={styles.eventDetails}>
        <nav>
          <a href="#">О мероприятии</a>
          <a href="#">Программа и спикеры</a>
          <a href="#">Организаторы</a>
          <a href="#">Партнеры</a>
        </nav>
        <p>
          25 мая в Петербурге и онлайне пройдет митап для разработчиков любого
          уровня, тимлидов и целых команд, которые задумываются или уже начали
          применять Go в коммерческой разработке. Поговорим, как писать
          производительный и легко сопровождаемый код без «побочных эффектов»
        </p>
      </section>
    </section>
  );
}

export default EventDescription;
