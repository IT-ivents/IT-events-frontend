import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './AccountMenu.module.css';
import Person from './../../images/person.png';
import Notification from './../../images/notification.png';
import Lock from './../../images/lock.png';
import List from './../../images/list.png';
import Logout from './../../images/logout.png';

const AccountMenu = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const tabs = [
    {
      image: Person,
      title: 'Персональная информация',
      link: 'userinfo',
    },
    {
      image: Notification,
      title: 'Уведомления',
      link: '/account/notifications',
    },
    {
      image: Lock,
      title: 'Безопасность',
      link: '/account/security',
    },
    {
      image: List,
      title: 'Предпочтения',
      link: 'preferences',
    },
    {
      image: Logout,
      title: 'Выход из аккаунта',
    },
  ];

  return (
    <section>
      <div className={styles.accountMenu}>
        <nav className={styles.accountTabs}>
          <h1 className={styles.headerName}>Маша Мамедова</h1>
          <p className={styles.headerEmail}>mamedova@marusya-white.ru</p>
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
