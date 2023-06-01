import React from 'react';
import AccountMenu from '../components/AccountMenu/AccountMenu';
import Security from '../components/Security/Security';

const AccountSecurityPage = () => {
  return (
    <section style={{ display: 'flex', width: '100%', gap: '100px' }}>
      <AccountMenu />
      <Security />
    </section>
  );
};

export default AccountSecurityPage;
