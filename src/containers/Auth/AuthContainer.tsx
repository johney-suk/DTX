import { useState } from 'react';
import LoginComponent from '../../components/Auth/LoginComponent';
import SignUpComponent from '../../components/Auth/SignUpComponent';
import './AuthContainer.css';  // CSS 파일을 불러옵니다.
import { useParams } from 'react-router-dom';

function AuthContainer() {
  const { code } = useParams();  // URL에서 code 추출
  const [isLogin, setIsLogin] = useState(true);

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="auth-container">
      {isLogin ? <LoginComponent code={code}/> : <SignUpComponent code={code} />}
      <div className="auth-toggle-button-container">
        <button className="auth-toggle-button" onClick={toggleAuthMode}>
          {isLogin ? '회원가입으로 전환' : '로그인으로 전환'}
        </button>
      </div>
    </div>
  );
}

export default AuthContainer;
