import styles from './Layout.module.css';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import ModalSignIn from '../Modals/ModalSignIn/ModalSignIn';
import ModalSignUp from '../Modals/ModalSingUp/ModalSignUp';

const Layout = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.page}>
        <Header />
        {<Outlet />}
        <Footer />
        <ModalSignIn />
        <ModalSignUp />
      </div>
    </div>
  );
};

export { Layout };
