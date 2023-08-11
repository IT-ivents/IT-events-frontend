import styles from './Pages.module.css';
import { cookiesSections } from '../utils/constants/cookies';
import CookieFile from '../utils/pdf/Cookie.pdf';

const CookiePage = () => {
  return (
    <section className={styles.policySection}>
      <h1 className={styles.policyTitle}>
        Политика в отношении использования файлов Cookies
      </h1>
      <ul>
        {cookiesSections.map((block) => (
          <li key={block.id} className={styles.policyList}>
            <h2 className={styles.policySubtitle}>{block.title}</h2>
            {block.content.map((content, index) => (
              <p key={index} className={styles.policyText}>
                {content}
              </p>
            ))}
          </li>
        ))}
      </ul>
      <a href={CookieFile} download className={styles.downloadPdf}>
        Скачать в формате PDF
      </a>
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
