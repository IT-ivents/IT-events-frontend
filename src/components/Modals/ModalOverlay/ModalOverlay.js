import React from 'react';

import styles from './ModalOverlay.module.css';

const ModalOverlay = ({ handleClose }) => {
  return <div className={styles.overlay} onClick={handleClose}></div>;
};

export default React.memo(ModalOverlay);
