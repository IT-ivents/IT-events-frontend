import styles from './Loader.module.css';
import { Circles } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <Circles
        height="80"
        width="80"
        color="#674EAE"
        ariaLabel="circles-loading"
        visible={true}
      />
    </div>
  );
};

export default Loader;
