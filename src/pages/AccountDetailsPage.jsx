import { Route, Routes } from 'react-router-dom';
import styles from './Pages.module.css';
import AccountMenu from '../components/AccountMenu/AccountMenu';
import UserInfo from '../components/UserInfo/UserInfo';
import UserEvents from '../components/UserEvents/UserEvents';
import Organization from '../components/Organization/Organization';

const AccountDetailsPage = ({
  mostAnticipatedEvents,
  selectedEvent,
  onCardClick,
  onNewEventClick,
}) => {
  return (
    <section className={styles.userInfo}>
      <AccountMenu />
      <Routes>
        <Route
          path="/"
          element={<UserInfo onNewEventClick={onNewEventClick} />}
        />
        <Route
          path="events"
          element={
            <UserEvents
              mostAnticipatedEvents={mostAnticipatedEvents}
              selectedEvent={selectedEvent}
              onCardClick={onCardClick}
              onNewEventClick={onNewEventClick}
            />
          }
        />
        <Route path="organization" element={<Organization />} />
      </Routes>
    </section>
  );
};

export default AccountDetailsPage;
