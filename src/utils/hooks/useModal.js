import { useEffect, useState } from 'react';
import { lockScroll, unLockScroll } from '../lockScroll';

function useModal() {
  const [isModalSignInOpen, setIsModalSignInOpen] = useState(false);
  const [isModalSignUpOpen, setIsModalSignUpOpen] = useState(false);

  const openModalSignIn = () => {
    setIsModalSignInOpen(true);
    lockScroll();
  };
  const closeModalSignIn = () => {
    setIsModalSignInOpen(false);
    unLockScroll();
  };

  const openModalSignUp = () => {
    if (isModalSignInOpen) {
      setIsModalSignInOpen(false);
    }
    setIsModalSignUpOpen(true);
    lockScroll();
  };

  const closeModalSignUp = () => {
    setIsModalSignUpOpen(false);
    unLockScroll();
  };

  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === 'Escape') {
        setIsModalSignUpOpen(false);
        setIsModalSignInOpen(false);
        unLockScroll();
      }
    };
    if (isModalSignInOpen || isModalSignUpOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      return () => {
        document.removeEventListener('keydown', handleEscapeKey);
      };
    }
  }, [isModalSignInOpen, isModalSignUpOpen]);

  return {
    isModalSignInOpen,
    isModalSignUpOpen,
    openModalSignIn,
    openModalSignUp,
    closeModalSignIn,
    closeModalSignUp,
  };
}

export default useModal;
