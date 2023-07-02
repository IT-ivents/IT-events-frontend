import styles from './Modal.module.css';
import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import ModalOverlay from '../ModalOverlay/ModalOverlay';

const Modal = ({ children, isOpen, handleClose }) => {
  const modalRef = useRef(null);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <section className={styles.container}>
      <ModalOverlay handleClose={handleClose} />
      <div className={styles.modal} ref={modalRef}>
        <div className={styles.closeButtonContainer} onClick={handleClose}>
          <button className={styles.closeButton} type="button" />
        </div>
        {children}
      </div>
    </section>,
    document.getElementById('root')
  );
};

export default React.memo(Modal);
