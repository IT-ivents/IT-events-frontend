import { useState } from 'react';
import styles from './AccountMenu.module.css';
import { useAuthContext } from '../../utils/context/AuthContext';
import { useLocation } from 'react-router-dom';
import { ReactComponent as Person } from './../../images/person.svg';
import { ReactComponent as PersonActive } from '../../images/person_active.svg';
import { ReactComponent as Calendar } from '../../images/calendar.svg';
import { ReactComponent as CalendarActive } from '../../images/calendar_active.svg';
import { ReactComponent as Exit } from './../../images/exit.svg';
import AccountButton from '../AccountButton/AccountButton';
import Avatar from '../Avatar/Avatar';

const AccountMenu = () => {
  const [activeTab, setActiveTab] = useState(0);
  const location = useLocation();
  const { currentUser, handleLogout } = useAuthContext();

  const handleLogoutClick = async () => {
    try {
      await handleLogout();
      handleTabClick(activeTab);
    } catch (error) {
      console.error('Ошибка выхода:', error);
    }
  };

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const tabs = [
    {
      imageDefault: <Person />,
      imageActive: <PersonActive />,
      title: 'Мой аккаунт',
      link: '/account',
    },
    {
      imageDefault: <Calendar />,
      imageActive: <CalendarActive />,
      title: 'Мои события',
      link: 'events',
    },
    {
      name: 'exit',
      imageDefault: <Exit />,
      title: 'Выйти',
      link: '/',
    },
  ];

  const menuTitles = {
    0: {
      title: currentUser.name,
      subtitle: currentUser.email,
      titleClass: styles.titleUser,
      subtitleClass: styles.subtitleUser,
    },
    1: {
      title: 'Мои события',
      subtitle: 'Здесь Вы можете управлять своими событиями',
      titleClass: styles.titleEvents,
      subtitleClass: styles.subtitleEvents,
    },
  };

  return (
    <section>
      {currentUser && (
        <div className={styles.accountMenu}>
          <div className={styles.userLogo}>
            {location.pathname === '/account' && (
              <Avatar name={currentUser.name} />
            )}
            <div>
              <h1 className={menuTitles[activeTab].titleClass}>
                {menuTitles[activeTab].title}
              </h1>
              <p className={menuTitles[activeTab].subtitleClass}>
                {menuTitles[activeTab].subtitle}
              </p>
            </div>
          </div>
          <nav className={styles.accountTabs}>
            {tabs.map((tab, index) => (
              <AccountButton
                key={index}
                to={tab.link}
                name={tab.name}
                title={tab.title}
                imageSrc={
                  index === activeTab ? tab.imageActive : tab.imageDefault
                }
                isActive={index === activeTab}
                onClick={
                  tab.name === 'exit'
                    ? handleLogoutClick
                    : () => handleTabClick(index)
                }
              />
            ))}
          </nav>
        </div>
      )}
    </section>
  );
};

export default AccountMenu;
