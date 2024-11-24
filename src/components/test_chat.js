import React, { useState } from 'react';
import fetchChatGPTResponse from '../api';
import { startSpeechRecognition, speakText } from '../utils/speech';

import mainLogo from '../assets/images/mainLogo.png'
import micButton from '../assets/images/mic.png'
import sendButton from '../assets/images/send.png'

import '../styles/Basic.css'
import '../styles/ChatbotPage.css'

function Main() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [recording, setRecording] = useState(false);

    const handleSendText = async () => {
        if (!input) return;
        const userMessage = { sender: 'user', text: input };
        //setMessages((prev) => [...prev, userMessage]);
        const botResponse = await fetchChatGPTResponse(input);
        console.log('ChatGPT 응답:', botResponse);
        setMessages((prev) => [...prev, userMessage, { sender: 'bot', text: botResponse }]);
        speakText(botResponse);
        setInput('');
    };

    const handleStartRecording = () => {
        setRecording(true);
        startSpeechRecognition(
            async (transcript) => {
                setRecording(false);
                const userMessage = { sender: 'user', text: transcript };
                //setMessages((prev) => [...prev, userMessage]);
                const botResponse = await fetchChatGPTResponse(transcript);
                setMessages((prev) => [...prev, userMessage, { sender: 'bot', text: botResponse }]);
                speakText(botResponse);
            },
            (error) => {
                setRecording(false);
                console.error('Speech recognition error:', error);
            }
        );
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
                    <a href="/quizPage">Quiz</a>
                </div>
            </div>

            {/* 좌측 사이드바 */}
            <div className="sidebar">
                
                



                <div className="vertical-line"></div>
            </div>

            {/* 채팅부분 */}
            <div className="center-container">
                <div className="chat-container">
                    {messages.map((msg, index) => (
                        <div key={index} className={msg.sender === 'user' ? 'user-msg' : 'bot-msg'}>
                            {msg.text}
                        </div>
                    ))}
                </div>
                <div className="intro-section">
                <div className="dog-icon">
                    <img src={mainLogo} alt="Main Logo" className="logo-image" />
                </div>
                <p className="description">강아지에 대해 무엇이든 물어보세요!</p>
                </div>
            </div>

            {/* 입력부분 */}
            <div className='input-container'>
                <button className="mic-button" onClick={handleStartRecording} disabled={recording} >
                    {recording ? 'Recording...' :
                        <img src={micButton} alt="micButton" className="icon-image" />}
                </button>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="메시지를 입력하세요."
                    className="text-input"
                />
                <button className="send-button" onClick={handleSendText}>
                    <img src={sendButton} alt="sendButton" className="icon-image" />
                </button>
            </div>
        </div>
    );
}

export default Main;
