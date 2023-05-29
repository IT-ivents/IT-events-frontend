import React from 'react';
import styles from './Pages.module.css';
import AccountBlock from '../components/AccountBlock/AccountBlock';
import Person from './../images/person.png';
import Notification from './../images/notification.png';
import Lock from './../images/lock.png';
import List from './../images/list.png';
import Logout from './../images/logout.png';

const AccountPage = () => {
  return (
    <section>
      <h1>Аккаунт</h1>
      <p className={styles.accountGreeting}>С возвращением, Маша</p>
      <div className={styles.accountBlocks}>
        <AccountBlock
          accoutBlockIcon={Person}
          title="Персональная информация"
          details="Редактирование личных данных"
        />
        <AccountBlock
          accoutBlockIcon={Notification}
          title="Уведомления"
          details="Расскажите, какие уведомления вы хотите получать"
        />
        <AccountBlock
          accoutBlockIcon={Lock}
          title="Безопасность"
          details="Обновите пароль"
        />
        <AccountBlock
          accoutBlockIcon={List}
          title="Предпочтения"
          details="Укажите свои интересы"
        />
        <AccountBlock accoutBlockIcon={Logout} title="Выход из аккаунта" />

        {/* <PersonalInfo />
        <Notifications />
        <Security />
        <Preferences />
        <Logout /> */}
      </div>
    </section>
  );
};

export default AccountPage;
