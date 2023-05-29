import { useState } from 'react';
import styles from './AccountMenu.module.css';
import Person from './../../images/person.png';
import Notification from './../../images/notification.png';
import Lock from './../../images/lock.png';
import List from './../../images/list.png';
import Logout from './../../images/logout.png';

function AccountMenu() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const tabs = [
    {
      image: Person,
      title: 'Персональная информация',
      content: <p>Персональная информация</p>,
    },
    {
      image: Notification,
      title: 'Уведомления',
      content: <p>Уведомления</p>,
    },
    {
      image: Lock,
      title: 'Безопасность',
      content: <p>Безопасность</p>,
    },
    {
      image: List,
      title: 'Предпочтения',
      content: <p>Предпочтения</p>,
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
}

export default AccountMenu;
