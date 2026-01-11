import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/landing/Landing';
import AuthPage from './pages/auth/Auth';
import Layout from './layouts/Layouts';
import AccountPage from './pages/account/Account';
import MakeTeamPage from './pages/make-team/MakeTeam';
import './App.css'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route element={<Layout />}>
          <Route path="/account" element={<AccountPage />} />
          <Route path="/make-team" element={<MakeTeamPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
