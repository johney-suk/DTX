import { useState } from 'react';
import LoginComponent from '../../components/Auth/LoginComponent';
import SignUpComponent from '../../components/Auth/SignUpComponent';
import './AuthContainer.css';  // CSS 파일을 불러옵니다.

function AuthContainer() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="auth-container">
      {isLogin ? <LoginComponent /> : <SignUpComponent />}
      <div className="auth-toggle-button-container">
        <button className="auth-toggle-button" onClick={toggleAuthMode}>
          {isLogin ? '회원가입으로 전환' : '로그인으로 전환'}
        </button>
      </div>
    </div>
  );
}

export default AuthContainer;
