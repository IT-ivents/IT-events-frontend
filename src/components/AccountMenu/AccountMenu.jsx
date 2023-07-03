import { useState } from 'react';
import styles from './AccountMenu.module.css';
import Person from './../../images/person.svg';
import PersonActive from '../../images/person_active.svg';
import Calendar from '../../images/calendar.svg';
import CalendarActive from '../../images/calendar_active.svg';
import Exit from './../../images/exit.svg';
import Logout from './../../images/logout.svg';
import AccountButton from '../AccountButton/AccountButton';
import PageTitle from '../PageTitle/PageTitle';
import useAuth from '../../utils/hooks/useAuth';

const AccountMenu = () => {
  const { handleLogout } = useAuth();
  const [activeTab, setActiveTab] = useState(0);

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
      headText: 'Organizator777',
      subtext: 'subzero2000@yandex.ru',
      imageDefault: Person,
      imageActive: PersonActive,
      title: 'Мой аккаунт',
      link: '/account',
    },
    {
      headText: 'Мои события',
      subtext: 'Здесь Вы можете управлять своими событиями',
      imageDefault: Calendar,
      imageActive: CalendarActive,
      title: 'Мои события',
      link: 'events',
    },
    {
      name: 'exit',
      imageDefault: Exit,
      title: 'Выход',
      link: '/',
    },
  ];

  const currentTab = tabs[activeTab];

  return (
    <section>
      <div className={styles.accountMenu}>
        <PageTitle title={currentTab.headText} subtitle={currentTab.subtext} />
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
    </section>
  );
};

export default AccountMenu;
