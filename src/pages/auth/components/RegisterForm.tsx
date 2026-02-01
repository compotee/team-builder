import { useState } from "react";

import "./Form.css"


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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://77.222.37.36:8080/auth/signUp', {
        method: 'POST',
        credentials: 'include', 
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          middleName: formData.middleName,
          lastName: formData.lastName,
          username: formData.userName,
          tgLink: formData.userName,
          password: formData.password,
          password_repeat: formData.confirmPassword,
        })
      });

      const responseData = await response.json();
      console.log('Ответ сервера:', responseData); 

      if (!response.ok) {
        throw new Error(responseData.message || `Ошибка ${response.status}`);
      }

      
      
      window.location.href = '/main-page';
    } catch (err) {
      setError(`Ошибка запроса: ${err}`);
    }
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
        name="userName"
        type="text" 
        placeholder="Логин в телеграмм"
        value={formData.userName}
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