import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import Logo from '../Logo/Logo';
import GitHubLogo from '../../images/SocialNetworks/GitHub.svg';
import MessengerLogo from '../../images/SocialNetworks/Messenger.svg';
import VkLogo from '../../images/SocialNetworks/VK.svg';
import useScrollToTop from '../../utils/hooks/useScrollToTop';
import PopupCookie from '../PopupCookie/PopupCookie';

const logoSize = {
  fontSize: '20px',
  color: '#F1F0EB',
};

const Footer = () => {
  const date = new Date().getFullYear();
  const { scrollToTop } = useScrollToTop();
  const [showPopup, setShowPopup] = useState(false);

  const renderFooterItems = () => {
    const footerItems = [
      { to: '/about', text: 'О нас' },
      { text: 'События' },
      { onClick: () => setShowPopup(true), text: 'Cookies' },
      { text: 'Мы в СМИ!' },
      { text: 'Войти в ЛК' },
      { to: '/privacy', text: 'Политика конфиденциональности' },
    ];

    return footerItems.map((item, index) => (
      <li className={styles.footerItem} key={index}>
        {item.to ? (
          <Link to={item.to} className={styles.logoLink}>
            <span>{item.text}</span>
          </Link>
        ) : (
          <span onClick={item.onClick}>{item.text}</span>
        )}
      </li>
    ));
  };

  return (
    <footer className={styles.footer} id="footer">
      <div className={styles.logos}>
        <Logo logoSize={logoSize} onClick={scrollToTop} />
        <span className={styles.year}>© {date} IT-events</span>
      </div>
      <div className={styles.infoContainer}>
        <ul className={styles.footerList}>{renderFooterItems()}</ul>
        <div className={styles.contacts}>
          <p className={styles.email}>it-connect-event@yandex.ru</p>
          <div className={styles.images}>
            <img src={GitHubLogo} alt="GitHub" />
            <img src={MessengerLogo} alt="Messenger" />
            <img src={VkLogo} alt="Vk" />
          </div>
        </div>
      </div>
      {showPopup && <PopupCookie setShowPopup={setShowPopup} />}
    </footer>
  );
};

export default Footer;

// import { Link } from 'react-router-dom';
// import styles from './Footer.module.css';
// import Logo from '../Logo/Logo';
// import GitHubLogo from '../../images/SocialNetworks/GitHub.svg';
// import MessengerLogo from '../../images/SocialNetworks/Messenger.svg';
// import VkLogo from '../../images/SocialNetworks/VK.svg';
// import useScrollToTop from '../../utils/hooks/useScrollToTop';
// import PopupCookie from '../PopupCookie/PopupCookie';

// const logoSize = {
//   fontSize: '20px',
//   color: '#F1F0EB',
// };

// const Footer = () => {
//   const date = new Date().getFullYear();

//   const { scrollToTop } = useScrollToTop();

//   const renderFooterItems = () => {
//     const footerItems = [
//       { to: '/about', text: 'О нас' },
//       { text: 'События' },
//       { to: '/cookie', text: 'Cookies' },
//       { text: 'Мы в СМИ!' },
//       { text: 'Войти в ЛК' },
//       { to: '/privacy', text: 'Политика конфиденциональности' },
//     ];

//     return footerItems.map((item, index) => (
//       <li className={styles.footerItem} key={index}>
//         {item.to ? (
//           <Link to={item.to} className={styles.logoLink}>
//             <span>{item.text}</span>
//           </Link>
//         ) : (
//           <span>{item.text}</span>
//         )}
//       </li>
//     ));
//   };

//   return (
//     <footer className={styles.footer} id="footer">
//       <div className={styles.logos}>
//         <Logo logoSize={logoSize} onClick={scrollToTop} />
//         <span className={styles.year}>© {date} IT-events</span>
//       </div>
//       <ul className={styles.footerList}>{renderFooterItems()}</ul>
//       <div className={styles.contacts}>
//         <p className={styles.email}>It@connectit.ru</p>
//         <div className={styles.images}>
//           <img src={GitHubLogo} alt="GitHub" />
//           <img src={MessengerLogo} alt="Messenger" />
//           <img src={VkLogo} alt="Vk" />
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
