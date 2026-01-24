import { useState } from "react";

import "./Form.css"


const RegisterForm = () => {
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    middleName: "",
    username: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }
    
    try {
      const response = await fetch('/api/auth/signUp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          first_name: formData.firstName,
          middle_name: formData.middleName,
          last_name: formData.lastName,
          password: formData.password
        })
      });

      if (!response.ok) {
        throw new Error('Ошибка авторизации');
      }
      
      window.location.href = '/main-page';
    } catch {
      setError('Ошибка при регистрации');
    }
  };

  const isFormValid = 
    formData.lastName && 
    formData.firstName && 
    formData.username && 
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
      />
      <input 
        className="form-input" 
        name="firstName"
        type="text" 
        placeholder="Имя"
        value={formData.firstName}
        onChange={handleChange}
      />
      <input 
        className="form-input" 
        name="middleName"
        type="text" 
        placeholder="Отчество (приналичии)"
        value={formData.middleName}
        onChange={handleChange}
      />
      <input 
        className="form-input" 
        name="username"
        type="text" 
        placeholder="Логин в телеграмм"
        value={formData.username}
        onChange={handleChange}
      />
      <input 
        className="form-input" 
        name="password"
        type="password" 
        placeholder="Пароль"
        value={formData.password}
        onChange={handleChange}
      />
      <input 
        className="form-input" 
        name="confirmPassword"
        type="password" 
        placeholder="Повторите пароль"
        value={formData.confirmPassword}
        onChange={handleChange}
      />
      <button 
        className={isFormValid ? "button button--active" : "button button--inactive-pending"} 
        type="submit"
      >
        Зарегистрироваться
      </button>
    </form>
  );
};

export default RegisterForm;