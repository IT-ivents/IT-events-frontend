import styles from './Pages.module.css';
import { policySections } from '../utils/constants/policy';
import PolicyFile from '../utils/pdf/Policy.pdf';

const PrivacyPolicyPage = () => {
  return (
    // <section className={styles.policyBackground}>
    <div className={styles.policySection}>
      <span className={styles.policySpan}>ООО «События-ИТ»</span>
      <h1 className={styles.policyTitle}>
        Политика в отношении <br />
        обработки персональных данных
      </h1>
      <ul>
        {policySections.map((block) => (
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
      <a href={PolicyFile} download className={styles.downloadPdf}>
        Скачать в формате PDF
      </a>
    </div>
    // </section>
  );
};

export default PrivacyPolicyPage;

// import PdfPreview from '../components/PdfPreview/PdfPreview';
// import styles from './Pages.module.css';
// import PageTitle from '../components/PageTitle/PageTitle';

// const PrivacyPolicyPage = () => {
//   return (
//     <div className={styles.policyPageWrapper}>
//       <PageTitle title="Политика конфиденциональности" />
//       <PdfPreview />;
//     </div>
//   );
// };

// export default PrivacyPolicyPage;
