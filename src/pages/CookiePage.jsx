import styles from './Pages.module.css';

const CookiePage = () => {
  return (
    <section className={styles.cookiesSection}>
      <h1 className={styles.policyTitle}>
        Политика в отношении использования файлов Cookies
      </h1>
    </section>
  );
};

export default CookiePage;

// import PdfPreview from '../components/PdfPreview/PdfPreview';
// import styles from './Pages.module.css';
// import PageTitle from '../components/PageTitle/PageTitle';

// const CookiePage = () => {
//   return (
//     <div className={styles.cookiesPageWrapper}>
//       <PageTitle title="Cookies" />
//       <PdfPreview />
//     </div>
//   );
// };

// export default CookiePage;
