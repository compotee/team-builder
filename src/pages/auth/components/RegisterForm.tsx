import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { api, type RegisterRequest } from '../../../api';
import "./Form.css"
import eyeOpenIcon from '../../../assets/eye-open.svg';
import eyeClosedIcon from '../../../assets/eye-close.svg';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    middleName: "",
    userName: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (formData.password !== formData.confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }
    
    setIsLoading(true);

    try {
      const registerData: RegisterRequest = {
        lastName: formData.lastName,
        firstName: formData.firstName,
        middleName: formData.middleName || undefined,
        tgLink: formData.userName,
        username: formData.userName,
        password: formData.password,
        password_repeat: formData.confirmPassword
      };

      const response = await api.auth.register(registerData);
      
      if (response.success) {
        navigate('/login', { state: { isLogin: true } });
      } else {
        setError(response.message || 'Ошибка при регистрации');
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Ошибка при регистрации');
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const isFormValid = 
    formData.lastName && 
    formData.firstName && 
    formData.userName && 
    formData.password && 
    formData.confirmPassword;

  return (
    <form className="form" onSubmit={handleSubmit}>
      {error && <div className="auth-form-error">{error}</div>}
      <input 
        className="form-input" 
        name="lastName"
        type="text" 
        placeholder="Фамилия"
        value={formData.lastName}
        onChange={handleChange}
        disabled={isLoading}
      />
      <input 
        className="form-input" 
        name="firstName"
        type="text" 
        placeholder="Имя"
        value={formData.firstName}
        onChange={handleChange}
        disabled={isLoading}
      />
      <input 
        className="form-input" 
        name="middleName"
        type="text" 
        placeholder="Отчество (при наличии)"
        value={formData.middleName}
        onChange={handleChange}
        disabled={isLoading}
      />
      <input 
        className="form-input" 
        name="userName"
        type="text" 
        placeholder="Логин в телеграмм"
        value={formData.userName}
        onChange={handleChange}
        disabled={isLoading}
      />
      <div className="password-input-wrapper">
        <input 
          className="form-input" 
          name="password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Пароль"
          value={formData.password}
          onChange={handleChange}
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
      <div className="password-input-wrapper">
        <input 
          className="form-input" 
          name="confirmPassword"
          type={showConfirmPassword ? 'text' : 'password'} 
          placeholder="Повторите пароль"
          value={formData.confirmPassword}
          onChange={handleChange}
          disabled={isLoading}
        />
        <button 
          type="button" 
          className="password-toggle-button"
          onClick={toggleConfirmPasswordVisibility }
          disabled={isLoading}
        >
          <img 
            src={showConfirmPassword ?  eyeOpenIcon : eyeClosedIcon}  
            alt={showConfirmPassword ? 'Скрыть пароль' : 'Показать пароль'} 
          />
        </button>
      </div>
      <button 
        className={isFormValid ? "button button--active" : "button button--inactive-pending"} 
        type="submit"
        disabled={!isFormValid || isLoading}
      >
        {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
      </button>
    </form>
  );
};

export default RegisterForm;