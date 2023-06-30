// import { Outlet, Route, Routes } from 'react-router-dom';
import styles from './Pages.module.css';
import AccountMenu from '../components/AccountMenu/AccountMenu';
import UserInfo from '../components/UserInfo/UserInfo';

const AccountDetailsPage = () => {
  return (
    <section className={styles.userInfo}>
      <AccountMenu />
      <UserInfo />
      {/* <Routes>
        <Route path="/" element={<Outlet />} />
        <Route path='/details' element={<UserInfo />} />
      </Routes> */}
    </section>
  );
};

export default AccountDetailsPage;
