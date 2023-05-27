import styles from './EventsList.module.css';
import EventCard from '../EventCard/EventCard';

const EventsList = ({ title, list }) => {
	return (
		<section className={styles.section}>
			<h2 className={styles.title}>{title}</h2>
			<ul className={styles.list}>
				{list.map((event) => (
					<EventCard key={event.id} event={event} />
				))}
			</ul>
		</section>
	);
};

export default EventsList;
