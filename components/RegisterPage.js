import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/RegisterPage.css';
import '../styles/Basic.css'

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('User Info:', userInfo);
    console.log('Pet Info:', petInfo);
  };

  return (

    <div className="register-container">
      {/* 상단 헤더 영역 */}
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
        <div className="header-row"> {/* 제목과 버튼을 가로로 배치하는 부분 */}
          <p>사이트 이용에 필요한 정보들을 입력합니다.</p>
          <button type="submit" className="submit-button">가입하기</button>
        </div>
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-container">
            {/* User Info Section */}
            <div className="section user-section">
              <h3 className="section-title">유저 정보 입력</h3>
              <div className="input-group">
                <label>
                  아이디<span class="red-star">*</span>
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
                  비밀번호<span class="red-star">*</span>
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
                  비밀번호 확인<span class="red-star">*</span>
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
                  이름<span class="red-star">*</span>
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
                  강아지 이름<span class="red-star">*</span>
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
                  나이<span class="red-star">*</span>
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
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
