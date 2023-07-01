import { useState } from 'react';
import styles from './AccountMenu.module.css';
import { Link } from 'react-router-dom';
import Person from './../../images/person.svg';
import Lock from './../../images/lock.png';
import List from './../../images/list.svg';
import Logout from './../../images/logout.svg';

const AccountMenu = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const tabs = [
    {
      image: Person,
      title: 'Персональная информация',
      link: 'details',
    },
    {
      image: List,
      title: 'Добавить событие',
      link: '/organization',
    },
    {
      image: Lock,
      title: 'Мои события',
      link: 'events',
    },
    {
      image: Logout,
      title: 'Выход из аккаунта',
      link: '/',
    },
  ];

  return (
    <section>
      <div className={styles.accountMenu}>
        <nav className={styles.accountTabs}>
          <h1 className={styles.headerName}>Organizator777</h1>
          <p className={styles.headerEmail}>subzero2000@yandex.ru</p>
          {tabs.map((tab, index) => (
            <Link to={tab.link}>
              <div
                key={index}
                className={
                  index === activeTab
                    ? `${styles.activeAccountTab}`
                    : `${styles.accountTab}`
                }
                onClick={() => handleTabClick(index)}
              >
                {tab.image && <img src={tab.image} alt={tab.title} />}
                {tab.title}
              </div>
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
};

export default AccountMenu;
