import styles from './Footer.module.css';

const Footer = () => {
	const date = new Date().getFullYear();
	const footerList = ['О нас', 'Политика конфиденциональности', 'Cookies'];
	return (
		<footer className={styles.footer}>
			<span className={styles.year}>&copy; {date} IT-events</span>
			<ul className={styles.footerList}>
				{footerList.map((item, index) => (
					<li className={styles.footerItem} key={index}>
						{item}
					</li>
				))}
			</ul>
		</footer>
	);
};

export default Footer;
