import { useState } from "react";

import "./Form.css"


const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log({
          username: username,
          password: password,
        })
    
    try {
      const response = await fetch('http://77.222.37.36:8080/auth/signIn', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          username: username.trim(),
          password: password,
        })
      });

      const responseData = await response.json();
      console.log('Ответ сервера:', responseData); 

      if (!response.ok) {
        throw new Error('Ошибка авторизации');
      }

      window.location.href = '/main-page';
    } catch (err) {
      setError(`${err}`);
    }
  };

  const isFormValid = username.trim() !== "" && password.trim() !== "";

  return (
    <form className="form" onSubmit={handleSubmit}>
      {error && <div className="auth-form-error">{error}</div>}
      <input 
        className="form-input" 
        type="text" 
        placeholder="Логин" 
        onChange={(e) => setUsername(e.target.value)}
      />
      <input 
        className="form-input" 
        type="password" 
        placeholder="Пароль" 
        onChange={(e) => setPassword(e.target.value)}
      />
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