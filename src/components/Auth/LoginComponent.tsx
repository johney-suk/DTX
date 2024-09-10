import React, { useEffect, useState } from 'react';
import { loginUser } from '../../store/actions/user';
import { User } from '../../store/types/index';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useNavigate } from 'react-router-dom';
import './LoginComponent.css';
import api from '../../utils/api';
import axios from 'axios';

interface LoginState {
  loginText: string;
  passwordText: string;
  showError: boolean;
  errorText: string;
  saveId: boolean;
  errorIdText: boolean;
  errorPwdText: boolean;
}

const LoginComponent: React.FC = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [state, setState] = useState<LoginState>({
    loginText: '',
    passwordText: '',
    showError: false,
    errorText: '',
    saveId: false,
    errorIdText: false,
    errorPwdText: false,
  });

  const {
    loginText,
    passwordText,
    showError,
    errorText,
    saveId,
    errorIdText,
    errorPwdText,
  } = state;

  useEffect(() => {
    const savedId = localStorage.getItem('savedId');
    if (savedId) {
      setState((prevState) => ({
        ...prevState,
        loginText: savedId,
        saveId: true,
      }));
    }
  }, []);


  const onChangeLoginInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value.length <= 15) {
      setState({ ...state, loginText: e.target.value.toString() });
    }
  };

  const onChangePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value.length <= 20) {
      setState({ ...state, passwordText: e.target.value });
    }
  };

  const loginButtonClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (loginText.length > 0 && passwordText.length > 0) {

      // 테스트용 (삭제 예정)
      if (e.currentTarget.getAttribute('data-type') === 'register') {
        console.log(e.currentTarget.getAttribute('data-type'));
        api.testloginApi().then(() => {
          saveIdToLocalStorage();
          console.log('Login successful');
          navigate('/');
        });
      }
      else
        loginProcess();
    }
    if (loginText.length < 1) {
      setState({ ...state, showError: true, errorText: '아이디를 입력하세요', errorPwdText: false });
    } else if (passwordText.length < 1) {
      setState({ ...state, showError: true, errorText: '비밀번호를 입력하세요', errorPwdText: false });
    }
  };

  const loginProcess = async () => {
    saveIdToLocalStorage();

    const user: User = {
      email: loginText,
      password: passwordText,
    };

    await dispatch(loginUser(user))
      .then(() => {
        console.log('Login successful');
        navigate('/');
      })
      .catch((err) => {
        console.error('Login failed', err);
        setState({
          ...state,
          showError: true,
          errorText: '로그인에 실패했습니다. 다시 시도하세요.',
        });
      });
  };

  const handleSaveIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, saveId: e.target.checked });
  };

  const saveIdToLocalStorage = () => {
    if (saveId) {
      localStorage.setItem('savedId', loginText);
    } else {
      localStorage.removeItem('savedId');
    }
  };

  return (
    <div className="login-container">
      <h2>로그인</h2>
      <div className="input-group">
        <label>이메일:</label>
        <input
          type="text"
          value={loginText}
          onChange={onChangeLoginInput}
          placeholder="ID"
          className={errorIdText ? 'input-error' : ''}
        />
      </div>
      <div className="input-group">
        <label>비밀번호:</label>
        <input
          type="password"
          value={passwordText}
          onChange={onChangePasswordInput}
          placeholder="Password"
          className={errorPwdText ? 'input-error' : ''}
        />
      </div>
      <div className="checkbox-group">
        <label>
          <input
            type="checkbox"
            checked={saveId}
            onChange={handleSaveIdChange}
          />
          아이디 저장
        </label>
      </div>
      {showError && <p className="error-message">{errorText}</p>}
      <button onClick={loginButtonClickHandler} className="login-button">로그인</button>
    </div>
  );
};

export default LoginComponent;