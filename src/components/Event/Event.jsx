import styles from './Event.module.css';
import PlayImage from '../../images/play.png';
import ShareImage from '../../images/share.png';
import LikeImage from '../../images/like.png';
import EventImage from '../../images/image.png';

// function Event() {
//   return (
//     <div className={styles.eventContainer}>
//       <EventDescription />
//       <aside className={styles.eventImage}>
//         <EventImage />
//       </aside>
//       <section>
//         <h2>Смотрите также</h2>
//         <div className={styles.relatedEvents}>
//           <RelatedEvent />
//           <RelatedEvent />
//           <RelatedEvent />
//         </div>
//       </section>
//     </div>
//   );
// }

function Event() {
	return (
		<div className={styles.eventContainer}>
			<article className={styles.eventDescription}>
				<header className={styles.eventHeader}>
					<h1>
						Go-митап для тех, кто только переходит или недавно перешел на Go
					</h1>
					<figure className={styles.eventFigure}>
						<img src={ShareImage} alt="Share" />
					</figure>
					<figure className={styles.eventFigure}>
						<img src={LikeImage} alt="Like" />
					</figure>
				</header>
				<ul className={styles.eventDates}>
					<li className={styles.eventDate}>Вт, 23 мая</li>
					<li className={styles.eventDate}>10:00–20:00</li>
					<li className={styles.eventDate}>
						Санкт-Петербург, Московский пр., 55, «NIMAX»
					</li>
				</ul>
				<figure className={styles.eventFigure}>
					<img src={PlayImage} alt="Play" />
					<figcaption>Online-трансляция</figcaption>
				</figure>
				<p>16 800 р.</p>
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
			</article>

			<aside className={styles.eventImage}>
				<img src={EventImage} alt="Image" />
			</aside>

			<section>
				<h2>Смотрите также</h2>
				<div className={styles.relatedEvents}>
					<div className={styles.relatedEvent}>
						<img
							className={styles.relatedEventImage}
							src={EventImage}
							alt="Image"
						/>
						<h3>Название</h3>
						<p>Москва, Хлебозавод</p>
						<p>25 мая 2023</p>
						<p>16 800 р.</p>
					</div>
					<div className={styles.relatedEvent}>
						<img
							className={styles.relatedEventImage}
							src={EventImage}
							alt="Image"
						/>
						<h3>Название</h3>
						<p>Санкт-Петербург, Московский пр. 55</p>
						<p>25 мая 2023</p>
						<p>3 400 р.</p>
					</div>
					<div className={styles.relatedEvent}>
						<img
							className={styles.relatedEventImage}
							src={EventImage}
							alt="Image"
						/>
						<h3>Название</h3>
						<p>Online</p>
						<p>27 мая 2023</p>
						<p>Бесплатно</p>
					</div>
				</div>
			</section>
		</div>
	);
}

export default Event;
