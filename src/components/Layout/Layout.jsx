import styles from './Layout.module.css';
import { Outlet, useLocation } from 'react-router-dom';
import HeroSection from '../HeroSection/HeroSection';
import Footer from '../Footer/Footer';

const Layout = () => {
  const location = useLocation();
  const pageRules = location.pathname === '/favorites' ? styles.favorites : '';
  return (
    <>
      <HeroSection />
      <main className={`${styles.main} ${pageRules}`}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
