import { useState } from "react";
import mockData from '../../../Mocks'

import "./Form.css"

import eyeOpenIcon from '../../../assets/eye-open.svg';
import eyeClosedIcon from '../../../assets/eye-close.svg';


const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (username === mockData.User.username && password === mockData.User.password) {
      localStorage.setItem('currentUser', JSON.stringify(mockData.User));
      localStorage.setItem('isAuthenticated', 'true');
      
      console.log('Вход выполнен успешно:', mockData.User);
      window.location.href = '/main-page';
    } else {
      setError('Неверный логин или пароль');
    }
  };

  const isFormValid = username.trim() !== "" && password.trim() !== "";

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      {error && <div className="auth-form-error">{error}</div>}
      <input 
        className="form-input" 
        type="text" 
        placeholder="Логин" 
        onChange={(e) => setUsername(e.target.value)}
      />
      <div className="password-input-wrapper">
        <input 
          className="form-input" 
          type={showPassword ? 'text' : 'password'}
          placeholder="Пароль" 
          onChange={(e) => setPassword(e.target.value)}
        />
        <button 
          type="button" 
          className="password-toggle-button"
          onClick={togglePasswordVisibility}
        >
          <img 
            src={showPassword ?  eyeOpenIcon : eyeClosedIcon}  
            alt={showPassword ? 'Скрыть пароль' : 'Показать пароль'} 
          />
        </button>
      </div>
      <button 
        className={isFormValid ? "button button--active" : "button button--inactive-pending"} 
        type="submit"
      >
        Войти
      </button>
    </form>
  );
};

export default LoginForm;