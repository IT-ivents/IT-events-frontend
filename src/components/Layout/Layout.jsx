import { Link, Outlet } from 'react-router-dom';
import styles from './Layout.module.css';

const Layout = () => {
	const date = new Date().getFullYear();
	const footerList = ['О нас', 'Политика конфиденциональности', 'Cookies'];
	return (
		<>
			<header className={styles.header}>
				<p className={styles.logo}>LOGO</p>
				<Link to="/sign-in" className={styles.linkButton}>
					Войти
				</Link>
			</header>
			<Outlet />
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
		</>
	);
};

export default Layout;
