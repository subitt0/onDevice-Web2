import React from 'react';
import '../styles/Basic.css'
import '../styles/MyPage.css'

import { Link } from 'react-router-dom';  // 'Link' import 추가
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';


function App() {
    const { currentUser, isAuthReady, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
          logout();
          navigate("/main");
          console.log('로그아웃 성공');
        } catch (error) {
          console.error('로그아웃 실패:', error.message);
        }
      };

    return (
        <div className="mypage">
            <div className="header">
                <div className="header-logo">
                    <a href="/main">ROBOBUDDY</a>
                </div>
                <div className="header-links">
                    <a href="/infoPage">Info</a>
                    <a href="/quiz">Quiz</a>
                </div>
            </div>
            <div className="mypage-content">
                <button onClick={handleLogout}>Log-out</button>
            </div>

        </div>
    );
}

export default App;