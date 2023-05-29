import { useState } from 'react';
import styles from './AccountMenu.module.css';

function AccountMenu() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const tabs = [
    {
      title: 'Персональная информация',
    },
    {
      title: 'Уведомления',
    },
    {
      title: 'Безопасность',
    },
    {
      title: 'Предпочтения',
    },
    {
      title: 'Выход из аккаунта',
    },
  ];

  return (
    <section>
      <h1>Маша Мамедова</h1>
      <p>mamedova@marusya-white.ru</p>

      <div className={styles.accountTabs}>
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
            {tab.title}
          </div>
        ))}
      </div>
    </section>
  );
}

export default AccountMenu;
