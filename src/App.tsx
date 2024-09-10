import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Header from './components/Header';
import AuthContainer from './containers/Auth/AuthContainer';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/login" element={<AuthContainer />} />
        <Route path="/" element={<MainLayout />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
