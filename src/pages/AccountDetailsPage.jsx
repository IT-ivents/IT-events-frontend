import { Outlet, Route, Routes } from 'react-router-dom';
import AccountMenu from '../components/AccountMenu/AccountMenu';
import Security from '../components/Security/Security';
import Notifications from '../components/Notifications/Notifications';

const AccountDetailsPage = () => {
  return (
    <>
      <AccountMenu />
      <Routes>
        <Route path="/" element={<Outlet />} />
        <Route path="security" element={<Security />} />
        <Route path="notifications" element={<Notifications />} />
        {/* <Route path="personal-info" element={<PersonalInfoTab />} /> */}
      </Routes>
    </>
  );
};

export default AccountDetailsPage;
