import React, {useState, useEffect } from 'react';
import '../styles/Basic.css'
import '../styles/QuizPage.css'

import { Link, useNavigate } from 'react-router-dom';  // 'Link' import 추가
import { useAuth } from '../AuthContext';


function App() {

    const { currentUser, logout } = useAuth();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

        // 로그인 후 UI 전환이 자연스럽게 이루어지도록 useEffect 사용
        useEffect(() => {
            if (currentUser) {
              setLoading(false); // 로그인 성공 시 로딩 해제
            }
          }, [currentUser]);
    return (
        <div class="quiz">
            <div className="header">
                <div className="header-logo">
                    <a href="/main">ROBOBUDDY</a>
                </div>
                <div className="header-links">
                    <a href="/infoPage">Info</a>
                    <a href="/quiz">Quiz</a>
                </div>
            </div>

        </div>
    );
}

export default App;