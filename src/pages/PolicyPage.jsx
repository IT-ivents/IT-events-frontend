import PdfPreview from '../components/PdfPreview/PdfPreview';
import styles from './Pages.module.css';
import PageTitle from '../components/PageTitle/PageTitle';
import Modal from '../components/Modals/Modal/Modal';

const PrivacyPolicyPage = () => {
  return (
    <div className={styles.policyPageWrapper}>
      <PageTitle title="Политика конфиденциональности" />
      <PdfPreview />;
    </div>
  );
};

export default PrivacyPolicyPage;
