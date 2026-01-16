import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

import './Auth.css';

import logo from '../../assets/team-builder-logo.svg';
import authBackgroundImg from "../../assets/auth-background-img.svg"


const AuthPage = () => {
    const location = useLocation();
    
    const getInitialIsLogin = () => {
        const state = location.state as { isLogin?: boolean };
        return state?.isLogin !== undefined ? state.isLogin : true;
    };

    const [isLogin, setIsLogin] = useState(getInitialIsLogin);

    return (
        <div className="auth-page">
            <img className='fixed-background-img' src={authBackgroundImg} alt="" />
            <div className='auth-page-logo'>
                <img src={logo} alt="Team Builder" />
                <h1 className='auth-page-logo-text'>Team Builder</h1>
            </div>
            <div className='form-container'>
                <div className="auth-switcher">
                    <button
                        className={!isLogin ? 'auth-switcher-active-btn' : 'auth-switcher-btn'}
                        onClick={() => setIsLogin(false)}
                    >
                        Регистрация
                    </button>
                    <button 
                        className={isLogin ? 'auth-switcher-active-btn' : 'auth-switcher-btn'}
                        onClick={() => setIsLogin(true)}
                    >
                        Вход
                    </button>
                </div>
                {isLogin ? <LoginForm /> : <RegisterForm />}
            </div>
        </div>
    );
};

export default AuthPage;