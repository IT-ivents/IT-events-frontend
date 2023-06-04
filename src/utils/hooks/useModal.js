import { useEffect, useState } from 'react';
import { lockScroll, unLockScroll } from '../lockScroll';

function useModal() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    lockScroll();
  };

  const handleClose = () => {
    setIsOpen(false);
    unLockScroll();
  };

  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        unLockScroll();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      return () => {
        document.removeEventListener('keydown', handleEscapeKey);
      };
    }
  }, [isOpen, setIsOpen]);

  return {
    isOpen,
    handleOpen,
    handleClose,
  };
}

export default useModal;
