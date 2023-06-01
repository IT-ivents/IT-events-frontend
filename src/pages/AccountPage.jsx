import styles from './Pages.module.css';
import AccountBlock from '../components/AccountBlock/AccountBlock';
import Person from './../images/person.png';
import Notification from './../images/notification.png';
import Lock from './../images/lock.png';
import List from './../images/list.png';
import Logout from './../images/logout.png';
import { Link } from 'react-router-dom';

const AccountPage = () => {
  return (
    <section>
      <h1 className={styles.accountTitle}>Аккаунт</h1>
      <p className={styles.accountGreeting}>С возвращением, Маша</p>
      <div className={styles.accountBlocks}>
        <Link to="details" className={styles.blockLink}>
          <AccountBlock
            accoutBlockIcon={Person}
            title="Персональная информация"
            details="Редактирование личных данных"
          />
        </Link>
        <Link to="notifications" className={styles.blockLink}>
          <AccountBlock
            accoutBlockIcon={Notification}
            title="Уведомления"
            details="Расскажите, какие уведомления вы хотите получать"
          />
        </Link>
        <Link to="security" className={styles.blockLink}>
          <AccountBlock
            accoutBlockIcon={Lock}
            title="Безопасность"
            details="Обновите пароль"
          />
        </Link>
        <Link to="details" className={styles.blockLink}>
          <AccountBlock
            accoutBlockIcon={List}
            title="Предпочтения"
            details="Укажите свои интересы"
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
