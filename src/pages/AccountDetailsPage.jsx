import { Route, Routes } from 'react-router-dom';
import styles from './Pages.module.css';
import AccountMenu from '../components/AccountMenu/AccountMenu';
import UserInfo from '../components/UserInfo/UserInfo';
import UserEvents from '../components/UserEvents/UserEvents';

const AccountDetailsPage = ({ onCardClick }) => {
  return (
    <section className={styles.userInfo}>
      <AccountMenu />
      <Routes>
        <Route path="/" element={<UserInfo />} />
        <Route
          path="events"
          element={<UserEvents onCardClick={onCardClick} />}
        />
      </Routes>
    </section>
  );
};

export default AccountDetailsPage;
