import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { app } from '../firebase'; // firebase.js에서 app 초기화 객체 가져오기
import '../styles/RegisterPage.css';
import '../styles/Basic.css';

function RegisterPage() {
  const [userInfo, setUserInfo] = useState({
    id: '',
    password: '',
    confirmPassword: '',
    name: '',
  });

  const [petInfo, setPetInfo] = useState({
    petName: '',
    petAge: '',
    specialNotes: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수 얻기
  const auth = getAuth(app); // Firebase auth 객체 가져오기

  const handleUserInfoChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePetInfoChange = (e) => {
    const { name, value } = e.target;
    setPetInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userInfo.password !== userInfo.confirmPassword) {
      setError('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, userInfo.id, userInfo.password);
      console.log('회원가입 성공');
      navigate('/loginPage'); // 회원가입 후 로그인 페이지로 이동
    } catch (error) {
      setError('회원가입 실패: ' + error.message);
    }
  };

  return (
    <div className="register-container">
      <div className="header">
        <div className="header-logo">
          <a href="/main">ROBOBUDDY</a>
        </div>
        <div className="header-links">
          <a href="/info">Info</a>
          <a href="/quiz">Quiz</a>
        </div>
      </div>

      <div className="register-container">
        <h1>회원 가입</h1>
        <div className="header-row">
          <p>사이트 이용에 필요한 정보들을 입력합니다.</p>
        </div>

        {/* 오류 메시지 출력 */}
        {error && <p className="error-message">{error}</p>}

        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-container">
            {/* User Info Section */}
            <div className="section user-section">
              <h3 className="section-title">유저 정보 입력</h3>
              <div className="input-group">
                <label>
                  아이디<span className="red-star">*</span>
                  <input
                    type="text"
                    name="id"
                    className="input-field"
                    value={userInfo.id}
                    onChange={handleUserInfoChange}
                    required
                  />
                </label>
              </div>
              <div className="input-group">
                <label>
                  비밀번호<span className="red-star">*</span>
                  <input
                    type="password"
                    name="password"
                    className="input-field"
                    value={userInfo.password}
                    onChange={handleUserInfoChange}
                    required
                  />
                </label>
              </div>
              <div className="input-group">
                <label>
                  비밀번호 확인<span className="red-star">*</span>
                  <input
                    type="password"
                    name="confirmPassword"
                    className="input-field"
                    value={userInfo.confirmPassword}
                    onChange={handleUserInfoChange}
                    required
                  />
                </label>
              </div>
              <div className="input-group">
                <label>
                  이름<span className="red-star">*</span>
                  <input
                    type="text"
                    name="name"
                    className="input-field"
                    value={userInfo.name}
                    onChange={handleUserInfoChange}
                    required
                  />
                </label>
              </div>
            </div>

            {/* Pet Info Section */}
            <div className="section pet-section">
              <h3 className="section-title">반려견 정보 입력</h3>
              <div className="input-group">
                <label>
                  강아지 이름<span className="red-star">*</span>
                  <input
                    type="text"
                    name="petName"
                    className="input-field"
                    value={petInfo.petName}
                    onChange={handlePetInfoChange}
                    required
                  />
                </label>
              </div>
              <div className="input-group">
                <label>
                  나이<span className="red-star">*</span>
                  <input
                    type="text"
                    name="petAge"
                    className="input-field"
                    value={petInfo.petAge}
                    onChange={handlePetInfoChange}
                    required
                  />
                </label>
              </div>
              <div className="input-group">
                <label>
                  특이사항 (질병, 알레르기 등)
                  <textarea
                    name="specialNotes"
                    className="input-field"
                    value={petInfo.specialNotes}
                    onChange={handlePetInfoChange}
                  />
                </label>
              </div>
            </div>
          </div>

          {/* submit 버튼을 form 안에 위치시킴 */}
          <button type="submit" className="submit-button">가입하기</button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
