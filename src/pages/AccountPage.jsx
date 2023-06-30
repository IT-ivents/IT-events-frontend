import styles from './Pages.module.css';
import AccountBlock from '../components/AccountBlock/AccountBlock';
import PageTitle from '../components/PageTitle/PageTitle';
import Person from './../images/person.svg';
import Notification from './../images/notification.png';
import Lock from './../images/lock.png';
import Edit from './../images/edit.svg';
import List from './../images/list.svg';
import Logout from './../images/logout.svg';
import { Link } from 'react-router-dom';

const AccountPage = () => {
  return (
    <section className={styles.accountPageWrapper}>
      <PageTitle title="Аккаунт" subtitle="С возвращением, Organizator777" />
      {/* <h1 className={styles.accountTitle}>Аккаунт</h1>
      <p className={styles.accountGreeting}>С возвращением, Organizator777</p> */}
      <div className={styles.accountBlocks}>
        <Link to="details" className={styles.blockLink}>
          <AccountBlock
            accoutBlockIcon={Person}
            title="Персональная информация"
            details="Редактирование личных данных"
          />
        </Link>
        {/* <Link to="/notifications" className={styles.blockLink}>
          <AccountBlock
            accoutBlockIcon={Notification}
            title="Уведомления"
            details="Расскажите, какие уведомления вы хотите получать"
          />
        </Link> */}
        {/* <Link to="security" className={styles.blockLink}>
          <AccountBlock
            accoutBlockIcon={Lock}
            title="Безопасность"
            details="Обновите пароль"
          />
        </Link> */}
        <Link to="events" className={styles.blockLink}>
          <AccountBlock
            accoutBlockIcon={Edit}
            title="Мои события"
            details="Редактировать"
          />
        </Link>
        <Link to="/organization" className={styles.blockLink}>
          <AccountBlock
            accoutBlockIcon={List}
            title="Добавить событие"
            details="Станьте организатором"
          />
        </Link>
        <Link to="/" className={styles.blockLink}>
          <AccountBlock accoutBlockIcon={Logout} title="Выход из аккаунта" />
        </Link>
      </div>
    </section>
  );
};

export default AccountPage;

// import AccountMenu from '../components/AccountMenu/AccountMenu';

// const AccountPage = () => {
//   return (
//     <AccountMenu />
//   );
// };

// export default AccountPage;
