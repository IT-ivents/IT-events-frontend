import React from 'react';
import styles from './MainAppSection.module.css';

const MainAppSection = ({ children }) => {
	return (
		<section className={styles.section}>
			<div className={styles.container}>
				<h1 className={styles.headText}>Не пропусти главные события IT</h1>
				<p className={styles.subText}>
					Сотни ивентов уже ждут тебя. И мы собрали их все
				</p>
			</div>
			{children}
		</section>
	);
};

export default MainAppSection;
