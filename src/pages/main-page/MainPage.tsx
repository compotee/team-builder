// import { useNavigate } from 'react-router-dom';

import "./MainPage.css"

import logo from '../../assets/team-builder-logo.svg';


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
        <div>
            <div>
                <div>
                    <h3>Распределения, в которых я участвую</h3>
                    {/* вывод в цикле */}
                    <div>
                        <h4>Название</h4>
                        <button>
                            <img src="" alt="" />
                        </button>
                    </div>
                </div>
                <div>
                    <h3>Администрируемые мной распределения</h3>
                    {/* вывод в цикле */}
                    <div>
                        <h4>Название</h4>
                        <button>
                            <img src="" alt="" />
                        </button>
                    </div>
                </div>
            </div>
            <img src="" alt="" />
        </div>
    </div>
  );
};

export default MainPage;