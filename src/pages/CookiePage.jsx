import PdfPreview from '../components/PdfPreview/PdfPreview';
import styles from './Pages.module.css';
import PageTitle from '../components/PageTitle/PageTitle';

const CookiePage = () => {
  return (
    <div className={styles.cookiesPageWrapper}>
      <PageTitle title="Cookies" />
      <PdfPreview />
    </div>
  );
};

export default CookiePage;
