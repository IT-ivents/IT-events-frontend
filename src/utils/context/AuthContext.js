import React, { createContext, useContext } from 'react';
import useAuth from '../hooks/useAuth';

const AuthContext = createContext();

export function AuthProvider(props) {
  const auth = useAuth();

  return <AuthContext.Provider value={auth} {...props} />;
}

export function useAuthContext() {
  return useContext(AuthContext);
}
