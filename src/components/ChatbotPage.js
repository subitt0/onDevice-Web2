import React, { useState, useEffect } from 'react';
import '../styles/Basic.css'
import '../styles/ChatbotPage.css'

import { Link } from 'react-router-dom';  // 'Link' import 추가

import mainLogo from '../assets/images/mainLogo.png'
import micButton from '../assets/images/mic.png'
import sendButton from '../assets/images/send.png'

function App() {
    const [searchHistory, setSearchHistory] = useState([]); // 검색내역
    const [input, setInput] = useState("");
    const [message, setMessage] = useState(""); // 입력 메세지
    const [response, setResponse] = useState(''); // 서버로부터 받은 응답
    const [selectedChat, setSelectedChat] = useState(null); // 선택된 채팅을 저장
    const [history, setHistory] = useState([]); // 검색 기록

    // 서버 URL
    const SERVER_URL = "http://<서버 IP>:<포트>";  // <----------------------- 여기에 입력

    const sendMessage = async () => { //메세지 전송 함수

        if (!message.trim()) return; // 빈 메시지는 처리하지 않음

        try {
            // 서버로 POST 요청
            const res = await fetch(`${SERVER_URL}/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message }), // JSON 데이터 전송
            });

            const data = await res.json(); // JSON 응답 처리
            setResponse(data.response); // 서버 응답 저장
            setSearchHistory([...searchHistory, message]); // 검색 내역 추가
            setMessage(''); // 입력 필드 초기화
        } catch (error) {
            console.error("서버와 통신 중 오류 발생:", error);
            alert("서버에 연결할 수 없습니다.");
        }
    };

    const handleVoiceInput = async () => { //음성 처리
        try {
            const res = await fetch(`${SERVER_URL}/stt`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await res.json();
            setMessage(data.transcription || ""); // 음성 인식 결과를 입력란에 표시
        } catch (error) {
            console.error("음성 입력 처리 중 오류 발생:", error);
        }
    };

    // 검색 내역 클릭 시 해당 채팅 보여주기
    const handleHistoryClick = (chat) => {
        setSelectedChat(chat); // 선택된 채팅을 상태로 저장
    };


    return (
        <div class="chatbot">
            {/* 헤더 */}
            <div className="header">
                <div className="header-logo">
                    <a href="/main">ROBOBUDDY</a>
                </div>
                <div className="header-links">
                    <a href="/infoPage">Info</a>
                    <a href="/quiz">Quiz</a>
                </div>
            </div>

            {/* 좌측 사이드바 */}
            <div className="sidebar">
                <h3>검색 내역</h3>
                <ul>
                    {searchHistory.map((chat, index) => (
                        <li key={index} onClick={() => handleHistoryClick(chat)}>
                            {chat.message}
                        </li>

                    ))}
                </ul>
                <div className="vertical-line"></div>
            </div>

            {/* 채팅부분 */}
            <div className="center-container">
                <div className="dog-icon">
                    <img src={mainLogo} alt="Main Logo" className="logo-image" />
                </div>
                <p className="description">강아지에 대해 무엇이든 물어보세요!</p>
            </div>

            {/* 입력부분 */}
            <div className='input-container'>
                <button className="mic-button" onClick={handleVoiceInput} >
                    <img src={micButton} alt="micButton" className="icon-image" />
                </button>
                <input
                    type="text"
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="메시지를 입력하세요."
                    className="text-input"
                />
                <button className="send-button" onClick={sendMessage}>
                    <img src={sendButton} alt="sendButton" className="icon-image" />
                </button>
            </div>
        </div>
    );
}

export default App;