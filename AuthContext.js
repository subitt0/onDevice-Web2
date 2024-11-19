// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, setPersistence, browserLocalPersistence, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { app } from './firebase';

const AuthContext = createContext({
    currentUser: null,
    isAuthReady: false
  });

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const auth = getAuth(app);

  useEffect(() => {
    const auth = getAuth(app);
    // 지속성 설정
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsAuthReady(true); // 인증 상태 로딩 완료
    });
    return unsubscribe;
  }).catch((error) => {
    console.error('지속성 설정 실패:', error.message);
    setIsAuthReady(true); // 에러가 발생해도 UI를 표시할 수 있도록 설정
  });
}, []);

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth).then(() => setCurrentUser(null));
  };

  const value = { // 현재 정보
    currentUser,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={{ currentUser, isAuthReady }}>
      {children}
    </AuthContext.Provider>
  );
}
