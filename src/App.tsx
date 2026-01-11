import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/landing/Landing';
import AuthPage from './pages/auth/Auth';
import MainLayout from './layouts/MainLayout';
import AccountPage from './pages/account/Account';
import MainPage from './pages/main-page/MainPage';
import MemberPage from './pages/for-member/Member';
import ProjectIdeasPage from './pages/project-ideas/ProjectIdeas';
import AdminPage from './pages/for-admin/index';

import './App.css'

function App() {

  return (
    <Router>
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
