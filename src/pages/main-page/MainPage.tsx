// import { useNavigate } from 'react-router-dom';

import "./MainPage.css"

import logo from '../../assets/team-builder-logo.svg';
import linkIcon from '../../assets/link-icon.svg'
import teamImg from '../../assets/main-page-team-img.svg'


const MainPage = () => {
//   const navigate = useNavigate();

//   const handleLoginClick = () => {
//     navigate('/auth', { state: { isLogin: true } });
//   };

  return (
    <div className="main-page-container">
        <div className="logo-div">
            <img className="logo-div-img" src={logo} alt="Team Builder" />
            <div>
                <h1 className="logo-div-text">Team Builder</h1>
                <h2 className="under-logo-text">Сформируй full-stack команду</h2>
            </div>
        </div>
        <p className="landing-info-text">
            Наша цель - автоматизировать формирование сбалансированных и эффективных проектных команд на основе компетенций и ролей участников.
        </p>
        <div className="main-page-teams-container">
            <div className="main-page-teams">
                <div className="main-page-teams-item">
                    <h3 className="main-page-teams-item-title">Распределения, в которых я участвую</h3>
                    {/* вывод в цикле */}
                    <div className="main-page-teams-item-team">
                        <div className="main-page-teams-item-team-title">Название</div>
                        <button className="main-page-teams-item-team-btn">
                            <img src={linkIcon} alt="" />
                        </button>
                    </div>
                </div>
                <div className="main-page-teams-item">
                    <h3 className="main-page-teams-item-title">Администрируемые мной распределения</h3>
                    {/* вывод в цикле */}
                    <div className="main-page-teams-item-team">
                        <div className="main-page-teams-item-team-title">Название</div>
                        <button className="main-page-teams-item-team-btn">
                            <img src={linkIcon} alt="" />
                        </button>
                    </div>
                </div>
            </div>
            <img src={teamImg} alt="" />
        </div>
    </div>
  );
};

export default MainPage;