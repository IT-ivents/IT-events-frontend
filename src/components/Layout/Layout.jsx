import styles from './Layout.module.css';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import ModalSignIn from '../Modals/ModalSignIn/ModalSignIn';
import ModalSignUp from '../Modals/ModalSingUp/ModalSignUp';
import { AuthProvider } from '../../utils/context/AuthContext';
import { EventsProvider } from '../../utils/context/EventsContext';
import { FiltersProvider } from '../../utils/context/SearchFilterContext';
import { ModalProvider } from '../../utils/context/ModalContext';

const Layout = () => {
  return (
    <AuthProvider>
      <EventsProvider>
        <FiltersProvider>
          <ModalProvider>
            <div className={styles.wrapper}>
              <div className={styles.page}>
                <Header />
                {<Outlet />}
                <Footer />
                <ModalSignIn />
                <ModalSignUp />
              </div>
            </div>
          </ModalProvider>
        </FiltersProvider>
      </EventsProvider>
    </AuthProvider>
  );
};

export { Layout };
