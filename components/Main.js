import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import mainLogo_white from '../assets/images/mainLogo_white.png';
import '../styles/Basic.css';
import '../styles/Main.css';

function App() {
  const { currentUser, logout } = useAuth();
  const [loading, setLoading] = useState(true); // 초기 로딩 상태 true
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      setLoading(true); // 로딩 상태 활성화
      await logout();
      console.log('로그아웃 성공');
      navigate('/'); // 로그아웃 후 메인 페이지로 이동
    } catch (error) {
      console.error('로그아웃 실패:', error.message);
    } finally {
      setLoading(false); // 로딩 상태 비활성화
    }
  };

  // currentUser 상태가 업데이트될 때 로딩 상태를 해제
  useEffect(() => {
    if (currentUser !== null) {
      setLoading(false); // currentUser가 null이 아니면 로딩 해제
    }
  }, [currentUser]); // currentUser가 변경될 때마다 실행

  return (
    <div>
      {loading ? (
        <div className="loading"></div> // 로딩 중일 때
      ) : (
        <div className="main">
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
          </div>

          <div className="button-content">
            {currentUser ? (
              <Link to="/myPage" className="button-link">
                <button className="btn">MyPage</button>
              </Link>
            ) : (
              <Link to="/loginPage" className="button-link">
                <button className="btn">Log-In</button>
              </Link>
            )}

            <Link to="/chatbotPage" className="button-link">
              <button className="btn">ChatBot</button>
            </Link>
          </div>


        </div>
      )}
    </div>
  );
}

export default App;
