import "./Landing.css"

import teamImage from '../../assets/main-page-img.svg';
import logo from '../../assets/team-builder-logo.svg';

const LandingPage = () => {
  return (
    <div>
      <div className="logo-div">
        <img src={logo} alt="Team Builder" />
        <h1>Team Builder</h1>
      </div>
      <h2>Сформируй full-stack команду</h2>
      <p>
        TeamBuilder — это система, в которой каждый участник указывает свои навыки, предпочтительные роли и уровень опыта. Алгоритм платформы автоматически распределяет людей по командам, обеспечивая оптимальный баланс компетенций и ролей в каждой группе для успешного выполнения проекта.
        <br/>
        <br/>
        Наша цель - автоматизировать формирование сбалансированных и эффективных проектных команд на основе компетенций и ролей участников.
      </p>
      {/* <div>
        <button>Вход</button>
        <button>Регестрация</button>
      </div> */}
      <img src={teamImage} alt="Изображение команды" />
    </div>
  );
};

export default LandingPage;