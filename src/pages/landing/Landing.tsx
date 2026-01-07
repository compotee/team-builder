import { useNavigate } from 'react-router-dom';

import "./Landing.css"

import teamImage from '../../assets/main-page-img.svg';
import logo from '../../assets/team-builder-logo.svg';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/auth', { state: { isLogin: true } });
  };

  const handleRegisterClick = () => {
    navigate('/auth', { state: { isLogin: false } });
  };

  return (
    <div className="landing-container">
      <div className="logo-div">
        <img className="logo-div-img" src={logo} alt="Team Builder" />
        <div>
          <h1 className="logo-div-text">Team Builder</h1>
          <h2 className="under-logo-text">Сформируй full-stack команду</h2>
        </div>
      </div>
      <div className="landing-info">
        <p className="landing-info-text">
          TeamBuilder — это система, в которой каждый участник указывает свои навыки, предпочтительные роли и уровень опыта. Алгоритм платформы автоматически распределяет людей по командам, обеспечивая оптимальный баланс компетенций и ролей в каждой группе для успешного выполнения проекта.
          <br/>
          <br/>
          Наша цель - автоматизировать формирование сбалансированных и эффективных проектных команд на основе компетенций и ролей участников.
        </p>
        <div className="landing-info-btns">
          <button 
            className="blue-button"
            onClick={handleLoginClick}
          >
            Вход
          </button>
          <button 
            className="blue-button"
            onClick={handleRegisterClick}
          >
            Регестрация
          </button>
        </div>
        <img className="landing-info-img" src={teamImage} alt="Изображение команды" />
      </div>
    </div>
  );
};

export default LandingPage;