import styles from './Loader.module.css';
import { Circles } from 'react-loader-spinner';
import ModalOverlay from '../Modals/ModalOverlay/ModalOverlay';

const overlay = {
  backgroundColor: 'rgba(0, 0, 0, 0.2)',
};

const Loader = () => {
  return (
    <>
      <ModalOverlay style={overlay} />
      <div className={styles.loaderContainer}>
        <Circles
          height="80"
          width="80"
          color="#674EAE"
          ariaLabel="circles-loading"
          visible={true}
        />
      </div>
    </>
  );
};

export default Loader;
