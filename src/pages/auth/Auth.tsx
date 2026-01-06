import { useState } from 'react';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import './Auth.css';

import logo from '../../assets/team-builder-logo.svg';
import authBackgroundImg from "../../assets/auth-background-img.svg"

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);

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