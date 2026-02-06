import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { api } from '../../../api';
import "./Form.css"
import eyeOpenIcon from '../../../assets/eye-open.svg';
import eyeClosedIcon from '../../../assets/eye-close.svg';

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await api.auth.login({ username, password });
      
      if (response.success) {
        navigate('/main-page');
      } else {
        setError(response.message || 'Неверный логин или пароль');
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Ошибка при входе');
    } finally {
      setIsLoading(false);
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
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        disabled={isLoading}
      />
      <div className="password-input-wrapper">
        <input 
          className="form-input" 
          type={showPassword ? 'text' : 'password'}
          placeholder="Пароль" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
        <button 
          type="button" 
          className="password-toggle-button"
          onClick={togglePasswordVisibility}
          disabled={isLoading}
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
        disabled={!isFormValid || isLoading}
      >
        {isLoading ? 'Вход...' : 'Войти'}
      </button>
    </form>
  );
};

export default LoginForm;