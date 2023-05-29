import { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
import styles from './AccountMenu.module.css';
import Person from './../../images/person.png';
import Notification from './../../images/notification.png';
import Lock from './../../images/lock.png';
import List from './../../images/list.png';
import Logout from './../../images/logout.png';
import Security from '../../components/Security/Security';
//import { Link } from 'react-router-dom';

const AccountMenu = () => {
  const [activeTab, setActiveTab] = useState(0);

  // const navigate = useNavigate();

  const handleTabClick = (index) => {
    setActiveTab(index);
    // navigate(`${tabs[index].name}`);
  };

  const tabs = [
    {
      image: Person,
      title: 'Персональная информация',
      content: <p>Персональная информация</p>,
      // name: 'userinfo',
    },
    {
      image: Notification,
      title: 'Уведомления',
      content: <p>Уведомления</p>,
      // name: 'notifications',
    },
    {
      image: Lock,
      title: 'Безопасность',
      content: <Security />,
      // name: 'security',
    },
    {
      image: List,
      title: 'Предпочтения',
      content: <p>Предпочтения</p>,
      // name: 'preferences',
    },
    {
      image: Logout,
      title: 'Выход из аккаунта',
      // name: 'logout',
    },
  ];

  return (
    <section>
      <div className={styles.accountMenu}>
        <nav className={styles.accountTabs}>
          <h1 className={styles.headerName}>Маша Мамедова</h1>
          <p className={styles.headerEmail}>mamedova@marusya-white.ru</p>
          {/* {tabs.map((tab, index) => (
            <Link key={index} to={`${tabs[index].name}`} className={styles.tabs}>
            <div
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
          ))} */}
          {tabs.map((tab, index) => (
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
          ))}
        </nav>
        <div className={styles.accountTabContent}>
          {tabs[activeTab].content}
        </div>
      </div>
    </section>
  );
};

export default AccountMenu;
