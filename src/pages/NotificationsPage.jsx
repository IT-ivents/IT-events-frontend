import styles from './Pages.module.css';
import DividerLine from './../components/DividerLine/DividerLine';

const NotificationsPage = () => {
  return (
    <>
      <DividerLine />
      <section className={styles.notificationsPageWrapper}>
        Notifications
      </section>
    </>
  );
};

export default NotificationsPage;
