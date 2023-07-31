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

  const toggleModalSignIn = () => {
    if (isModalSignInOpen) {
      closeModalSignIn();
    } else {
      openModalSignIn();
    }
  };

  const toggleModalSignUp = () => {
    if (isModalSignUpOpen) {
      setIsModalSignUpOpen(false);
      unLockScroll();
    } else {
      setIsModalSignInOpen(false);
      setIsModalSignUpOpen(true);
      lockScroll();
    }
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
    toggleModalSignIn,
    toggleModalSignUp,
  };
}

export default useModal;
