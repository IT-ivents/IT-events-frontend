import styles from './Modal.module.css';
import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import ModalOverlay from '../ModalOverlay/ModalOverlay';

const Modal = ({ children, isOpen, onClose }) => {
  const modalRef = useRef(null);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <section className={styles.container}>
      <ModalOverlay onClose={onClose} />
      <div className={styles.modal} ref={modalRef}>
        <div className={styles.closeButtonContainer} onClick={onClose}>
          <button className={styles.closeButton} type="button" />
        </div>
        {children}
      </div>
    </section>,
    document.getElementById('root')
  );
};

export default React.memo(Modal);
