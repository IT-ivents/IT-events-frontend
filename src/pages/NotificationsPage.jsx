import styles from './Pages.module.css';
import PageTitle from '../components/PageTitle/PageTitle';

const NotificationsPage = () => {
  return (
    <section className={styles.notificationsPageWrapper}>
      <PageTitle
        title="Уведомления"
        subtitle="Здесь вы видите интересные события, которые вы указали в списке интересных тем."
      />
    </section>
  );
};

export default NotificationsPage;
