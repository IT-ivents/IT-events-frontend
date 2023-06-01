import React from 'react';
import AccountMenu from '../components/AccountMenu/AccountMenu';
import Notifications from '../components/Notifications/Notifications';

const AccoundNotificationsPage = () => {
  return (
    <section style={{ display: 'flex', width: '100%', gap: '100px' }}>
      <AccountMenu />
      <Notifications />
    </section>
  );
};

export default AccoundNotificationsPage;
