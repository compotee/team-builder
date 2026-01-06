import "./Form.css"

const RegisterForm = () => {
  return (
    <form className="form">
        <input className="form-input" type="text" placeholder="Фамилия" />
        <input className="form-input" type="text" placeholder="Имя" />
        <input className="form-input" type="text" placeholder="Отчество (приналичии)" />
        <input className="form-input" type="email" placeholder="Почта" />
        <input className="form-input" type="email" placeholder="Логин" />
        <input className="form-input" type="password" placeholder="Пароль" />
        <input className="form-input" type="password" placeholder="Повторите пароль" />
        <button className="blue-button" type="submit">Зарегистрироваться</button>
    </form>
  );
};

export default RegisterForm;