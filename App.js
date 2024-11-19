// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './components/Main';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ChatbotPage from './components/ChatbotPage';
import InfoPage from './components/InfoPage';
import QuizPage from './components/QuizPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/main" element={<Main />} />
        <Route path="/loginPage" element={<LoginPage />} />
        <Route path="/registerPage" element={<RegisterPage />} />
        <Route path="/chatbotPage" element={<ChatbotPage />} />
        <Route path="/infoPage" element={<InfoPage />} />
        <Route path="/quizPage" element={<QuizPage />} />
      </Routes>
    </Router>
  );
}

export default App;
