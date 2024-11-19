import React from 'react';
import '../styles/Basic.css'
import '../styles/Main.css'

import { Link } from 'react-router-dom';  // 'Link' import 추가

import mainLogo_white from '../assets/images/mainLogo_white.png';

function App() {
  return (
    <div className="main" >
      <div className="header">
        <div className="header-logo">
          <a href="/main">ROBOBUDDY</a>
        </div>
        <div className="header-links">
          <a href="/infoPage">Info</a>
          <a href="/quizPage">Quiz</a>
        </div>
      </div>

      <div className="main-content">
        <div className="logo">
          <img src={mainLogo_white} alt="Main Logo" className="logo-image" />
          <div className="main-logo-text">ROBOBUDDY</div>
        </div>

        <div className="button-content">
          <Link to="/loginPage" className="login-button-link">
            <button className="btn">Log-In</button>
          </Link>
          <Link to="/chatbotPage" className="chatbot-button-link">
          <button className="btn">ChatBot</button>
          </Link>
        </div></div>
    </div>
  );
}

export default App;
