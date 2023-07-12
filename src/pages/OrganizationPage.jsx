import styles from './Pages.module.css';
import Organization from '../components/Organization/Organization';

const OrganizationPage = ({ selectedEvent }) => {
  return (
    <div className={styles.organizationWrapper}>
      <Organization selectedEvent={selectedEvent} />
    </div>
  );
};

export default OrganizationPage;
