import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase'; // firebase.js에서 db 가져오기

import { Link } from 'react-router-dom';  // 'Link' import 추가
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

import Modal from './Modal';
import { useModal } from '../hooks/useModal';

import '../styles/Basic.css'
import '../styles/MyPage.css'


function MyPage() {
    const { currentUser, isAuthReady, logout } = useAuth();
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const auth = getAuth(); // Firebase auth 객체 가져오기
    const { modalMessage, isModalOpen, openModal, closeModal } = useModal();
    const [image, setImage] = useState(null); // 업로드된 이미지를 저장할 state

    // 이미지 업로드 핸들러
    const handleImageUpload = (e) => {
        const file = e.target.files[0]; // 업로드된 파일을 가져옴
        if (file) {
            const reader = new FileReader(); // FileReader를 이용해 파일을 읽어들임
            reader.onloadend = () => {
                setImage(reader.result); // 파일을 읽은 후 결과를 state에 저장
            };
            reader.readAsDataURL(file); // 파일을 Data URL로 읽음 (이미지 미리보기용)
        }
    }


    const handleLogout = async () => {
        try {
            logout();
            navigate("/main");
            openModal('로그아웃 성공! 홈화면으로 돌아갑니다.');
            setTimeout(() => {
                navigate('/Main');
            }, 2000); // 모달이 열린 후 2초 후 로그인 페이지로 이동
        } catch (error) {
            openModal('로그아웃 실패:', error.message);
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            const user = auth.currentUser; // 현재 로그인된 사용자
            if (user) {
                try {
                    // Firestore에서 유저 데이터를 가져오기
                    const docRef = doc(db, 'users', user.uid); // 'users' 컬렉션에서 현재 사용자 문서 가져오기
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        setUserData(docSnap.data()); // 가져온 데이터를 상태에 저장
                    } else {
                        openModal('사용자 데이터가 존재하지 않습니다.');
                    }
                } catch (error) {
                    openModal('데이터를 가져오는 데 오류가 발생했습니다: ' + error.message);
                }
            } else {
                openModal('로그인된 사용자가 없습니다.');
                navigate('/loginPage'); // 로그인 페이지로 리디렉션
            }
        };

        fetchUserData();
    }, [auth, navigate]);

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="mypage">
            {isModalOpen && <Modal message={modalMessage} onClose={closeModal} />}

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
            {/* 마이페이지 */}
            {userData ? (
                <div className="mypage-content">
                    <div>
                        <input className="upload-button" type="file" onChange={handleImageUpload} /> {/* 파일 입력 */}

                        {/* 이미지 미리보기 */}
                        {image && <img className="image-icon" src={image} alt="Uploaded Preview" />}
                    </div>
                    <p>{userData.petInfo.petGender === "여자" ? "♀" : userData.petInfo.petGender === "남자" ? "♂" : ""}</p>
                    <p>{userData.petInfo.petName}</p>
                    <p>{userData.petInfo.petAge}</p>
                    
                    <p className="special note">특이사항: {userData.petInfo.specialNotes}</p>

                    <button className="logout-button" onClick={handleLogout}>Log-out</button>
                </div>
            ) : (
                <div className="loading">로딩 중...</div>
            )}
        </div>
    );
}

export default MyPage;