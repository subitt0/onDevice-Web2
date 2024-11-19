// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext'; // AuthProvider 임포트
import Main from './components/Main';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ChatbotPage from './components/ChatbotPage';
import MyPage from './components/MyPage';
import InfoPage from './components/InfoPage';
import QuizPage from './components/QuizPage';

function App() {
  const { currentUser, isAuthReady } = useAuth();  // 인증 상태 가져오기
  const [isLoading, setIsLoading] = useState(true);  // 로딩 상태 관리

  useEffect(() => {
    if (isAuthReady) {
      setIsLoading(false);  // 인증 상태 준비 완료 시 로딩 종료
    }
  }, [isAuthReady]);


  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/main" element={<Main />} />
          <Route path="/loginPage" element={<LoginPage />} />
          <Route path="/registerPage" element={<RegisterPage />} />
          <Route path="/chatbotPage" element={<ChatbotPage />} />
          <Route path="/myPage" element={<MyPage />} />
          <Route path="/infoPage" element={<InfoPage />} />
          <Route path="/quizPage" element={<QuizPage />} />
        </Routes>
      </Router>
    </AuthProvider>

  );
}

export default App;
