import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import LandingPage from './pages/landing/Landing';
import AuthPage from './pages/auth/Auth';
import MainLayout from './layouts/MainLayout';
import AccountPage from './pages/account/Account';
import MainPage from './pages/main-page/MainPage';
import MemberPage from './pages/for-member/Member';
import ProjectIdeasPage from './pages/project-ideas/ProjectIdeas';
import AdminPage from './pages/for-admin/index';

import './App.css'

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route element={<MainLayout />}>
          <Route path="/account" element={<AccountPage />} />
          <Route path="/main-page" element={<MainPage />} />
          <Route path="/memeber" element={<MemberPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/project-ideas" element={<ProjectIdeasPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
