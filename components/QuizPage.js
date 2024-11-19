import React from 'react';
import '../styles/Basic.css'
import '../styles/QuizPage.css'

import { Link } from 'react-router-dom';  // 'Link' import 추가


function App() {
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