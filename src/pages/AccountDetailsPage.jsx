import { Route, Routes } from 'react-router-dom';
import styles from './Pages.module.css';
import AccountMenu from '../components/AccountMenu/AccountMenu';
import UserInfo from '../components/UserInfo/UserInfo';
import UserEvents from '../components/UserEvents/UserEvents';
import Organization from '../components/Organization/Organization';

const AccountDetailsPage = ({ mostAnticipatedEvents }) => {
  return (
    <section className={styles.userInfo}>
      <AccountMenu />
      <Routes>
        <Route path="details" element={<UserInfo />} />
        <Route
          path="events"
          element={<UserEvents mostAnticipatedEvents={mostAnticipatedEvents} />}
        />
        <Route path="organization" element={<Organization />} />
      </Routes>
    </section>
  );
};

export default AccountDetailsPage;
