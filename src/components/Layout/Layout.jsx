import styles from './Layout.module.css';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const Layout = ({ isLoggedIn }) => {
  const location = useLocation();
  const pageRules = location.pathname === '/favorites' ? styles.favorites : '';
  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <main className={`${styles.main} ${pageRules}`}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
