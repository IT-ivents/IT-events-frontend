import styles from './Header.module.css';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../Logo/Logo';
import SearchField from '../SearchField/SearchField';
import HeroSection from '../HeroSection/HeroSection';
import notificationIcon from '../../images/notifications-icon.svg';
import enterIcon from '../../images/enter_acc.svg';
import favoritesIcon from '../../images/favorites-header-icon.svg';

const smallForm = {
  width: '450px',
  height: '44px',
  marginLeft: '-53px',
  border: '1px solid #C9CCD8',
  borderRadius: '20px',
};

const smallFieldset = {
  gap: '6px',
  marginLeft: '13px',
};

const smallInput = {
  width: '397px',
};

const Header = ({ onSearch, searchQuery, onEnter }) => {
  const location = useLocation();
  // const isSearchFieldInvisible =
  //   location.pathname !== '/favorites' &&
  //   location.pathname !== '/notifications' &&
  //   location.pathname !== '/results' &&
  //   location.pathname !== '/preferences' &&
  //   location.pathname !== '/privacy';

  const isSearchFieldOnTop =
    location.pathname === '/event' ||
    location.pathname === '/favorites' ||
    location.pathname === '/notifications';

  const navLinks = [
    {
      id: 1,
      name: 'Уведомления',
      path: '/notifications',
      src: notificationIcon,
      alt: 'Иконка, Колокольчик',
    },
    {
      id: 2,
      name: 'Избранное',
      path: '/favorites',
      src: favoritesIcon,
      alt: 'Иконка, Избранное',
    },
    {
      id: 3,
      name: 'Войти',
      src: enterIcon,
      alt: 'Иконка, Войти в кабинет',
    },
    {
      id: 4,
      name: 'form',
      path: '/organization',
    },
  ];

  return (
    <header
      className={styles.header}
      style={{
        paddingBottom: location.pathname === '/results' ? '20px' : '',
      }}
    >
      <div className={styles.linksContainer}>
        <Logo />
        {isSearchFieldOnTop && (
          <SearchField
            onSearch={onSearch}
            searchQuery={searchQuery}
            smallForm={smallForm}
            smallFieldset={smallFieldset}
            smallInput={smallInput}
          />
        )}
        <nav className={styles.navigationBar}>
          {navLinks.map((link) => (
            <Link
              className={styles.navLink}
              key={link.id}
              to={link.path}
              onClick={link.id === 3 ? onEnter : null}
            >
              <img src={link.src} alt={link.alt} />
              <p>{link.name}</p>
            </Link>
          ))}
        </nav>
      </div>
      {location.pathname === '/' && <HeroSection />}
      {location.pathname === '/results' && (
        <div className={styles.searchFieldContainer}>
          <SearchField
            onSearch={onSearch}
            searchQuery={searchQuery}
            smallForm={smallForm}
            smallFieldset={smallFieldset}
            smallInput={smallInput}
          />
        </div>
      )}
    </header>
  );
};

export default Header;

// const Header = ({ onSearch, searchQuery, onEnter }) => {
//   const location = useLocation();
//   const isSearchFieldInvisible =
//     // location.pathname !== '/event' &&
//     location.pathname !== '/favorites' &&
//     location.pathname !== '/notifications' &&
//     location.pathname !== '/results' &&
//     location.pathname !== '/preferences' &&
//     location.pathname !== '/privacy';

//   const navLinks = [
//     {
//       id: 1,
//       name: 'Уведомления',
//       path: '/notifications',
//       src: notificationIcon,
//       alt: 'Иконка, Колокольчик',
//     },
//     {
//       id: 2,
//       name: 'Избранное',
//       path: '/favorites',
//       src: favoritesIcon,
//       alt: 'Иконка, Избранное',
//     },
//     {
//       id: 3,
//       name: 'Войти',
//       src: enterIcon,
//       alt: 'Иконка, Войти в кабинет',
//     },
//   ];

//   return location.pathname === '/' ? (
//     // <header className={styles.header}>
//     <header className={styles.container}>
//       <div className={styles.linksContainer}>
//         <Logo />
//         <nav className={styles.navigationBar}>
//           {navLinks.map((link) => (
//             <Link
//               className={styles.navLink}
//               key={link.id}
//               to={link.path}
//               onClick={link.id === 3 ? onEnter : null}
//             >
//               <img src={link.src} alt={link.alt} />
//               <p>{link.name}</p>
//             </Link>
//           ))}
//         </nav>
//       </div>
//       <HeroSection />
//       {/* <SearchField onSearch={onSearch} /> */}
//     </header>
//   ) : (
//     // </header>
//     // <header className={styles.header} style={{ height: 'fit-content' }}>
//     <header className={styles.borderContainer}>
//       <div className={styles.linksContainer}>
//         <Logo />
//         {!isSearchFieldInvisible && (
//           <SearchField
//             onSearch={onSearch}
//             searchQuery={searchQuery}
//             smallForm={smallForm}
//             smallFieldset={smallFieldset}
//             smallInput={smallInput}
//           />
//         )}
//         <nav className={styles.navigationBar}>
//           {navLinks.map((link) => (
//             <>
//               <Link
//                 className={styles.navLink}
//                 key={link.id}
//                 to={link.path}
//                 onClick={link.id === 3 ? onEnter : null}
//               >
//                 <img src={link.src} alt={link.alt} />
//                 <p>{link.name}</p>
//               </Link>
//             </>
//           ))}
//         </nav>
//       </div>
//     </header>
//     // </header>
//   );
// };

// export default Header;
