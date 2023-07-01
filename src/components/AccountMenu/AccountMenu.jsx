import { useState } from 'react';
import styles from './AccountMenu.module.css';
import Person from './../../images/person.svg';
import Edit from './../../images/edit.svg';
import List from './../../images/list.svg';
import Logout from './../../images/logout.svg';
import AccountButton from '../AccountButton/AccountButton';
import PageTitle from '../PageTitle/PageTitle';

const AccountMenu = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const tabs = [
    {
      headText: 'Organizator777',
      subtext: 'subzero2000@yandex.ru',
      image: Person,
      title: 'Персональная информация',
      link: 'details',
    },
    {
      headText: 'Organizator777',
      subtext: 'subzero2000@yandex.ru',
      image: List,
      title: 'Добавить событие',
      link: 'organization',
    },
    {
      headText: 'Ваши события',
      subtext: 'Настройки отображения',
      image: Edit,
      title: 'Ваши события',
      link: 'events',
    },
    {
      image: Logout,
      title: 'Выход из аккаунта',
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
              title={tab.title}
              imageSrc={tab.image}
              isActive={index === activeTab}
              onClick={() => handleTabClick(index)}
            />
          ))}
        </nav>
      </div>
    </section>
  );
};

export default AccountMenu;
