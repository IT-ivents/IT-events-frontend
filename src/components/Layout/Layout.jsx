import styles from './Layout.module.css';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const Layout = ({ isLoggedIn }) => {
	return (
		<>
			<Header isLoggedIn={isLoggedIn} />
			<main className={styles.main}>
				<Outlet />
			</main>
			<Footer />
		</>
	);
};

export default Layout;
