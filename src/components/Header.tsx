import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { logout } from '../store/reducers/user';

const Header: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  console.log(123123,isAuthenticated)

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login'); // 로그아웃 후 로그인 페이지로 이동
  };

  return (
    <header className="header">
      <div className="logo">DTX</div>
      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/settings" className="nav-link">Settings</Link>
          </li>
          <li className="nav-item">
            {isAuthenticated ? (
              <div>
                <span>환영합니다, {user?.email}!</span> 
                <button onClick={handleLogout} className="nav-link logout-button">Logout</button>
              </div>
            ) : (
              <Link to="/login" className="nav-link">Login</Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;