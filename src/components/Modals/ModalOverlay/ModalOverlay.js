import React from 'react';

import styles from './ModalOverlay.module.css';

const ModalOverlay = ({ handleClose, style }) => {
  return (
    <div className={styles.overlay} onClick={handleClose} style={style}></div>
  );
};

export default React.memo(ModalOverlay);
