import "./Form.css"


const LoginForm = () => {
  return (
    <form className="form">
      <input className="form-input" type="text" placeholder="Логин" />
      <input className="form-input" type="password" placeholder="Пароль" />
      <button className="blue-button" type="submit">Войти</button>
    </form>
  );
};

export default LoginForm;