import { useState, useEffect } from 'react';
import styles from './AccountMenu.module.css';
import { useLocation } from 'react-router-dom';
import Person from './../../images/person.svg';
import PersonActive from '../../images/person_active.svg';
import Calendar from '../../images/calendar.svg';
import CalendarActive from '../../images/calendar_active.svg';
import Exit from './../../images/exit.svg';
import AccountButton from '../AccountButton/AccountButton';
import useAuth from '../../utils/hooks/useAuth';
import Avatar from '../Avatar/Avatar';

const AccountMenu = ({ handleLogout, currentUser }) => {
  const [activeTab, setActiveTab] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const storedActiveTab = localStorage.getItem('activeMenuTab');
    if (storedActiveTab) {
      setActiveTab(parseInt(storedActiveTab));
    }
  }, []);

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
    localStorage.setItem('activeMenuTab', index.toString());
  };

  const tabs = [
    {
      imageDefault: Person,
      imageActive: PersonActive,
      title: 'Мой аккаунт',
      link: '/account',
    },
    {
      imageDefault: Calendar,
      imageActive: CalendarActive,
      title: 'Мои события',
      link: 'events',
    },
    {
      name: 'exit',
      imageDefault: Exit,
      title: 'Выйти',
      link: '/',
    },
  ];

  const menuTitles = {
    0: {
      title: currentUser.username,
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

  // const currentTab = tabs[activeTab];

  return (
    <section>
      {currentUser && (
        <div className={styles.accountMenu}>
          <div className={styles.userLogo}>
            {location.pathname === '/account' && (
              <Avatar name={currentUser.username} />
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
