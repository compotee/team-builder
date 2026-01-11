import { NavLink } from 'react-router-dom';

import './Header.css'

import logo from '../../assets/team-builder-logo.svg';
import userIcon from '../../assets/user-icon.svg'

const Header = () => {
  return (
    <header className='header-container'>
        <nav className='links-container'>
            <div className="nav-item logo-nav">
                <img className='header-logo-img' src={logo} alt="" />
                TeamBuilder
            </div>
            <NavLink 
                to="/main-page"
                className={({ isActive }) => 
                    `nav-item ${isActive ? 'nav-item-active ' : ''}`
                }
            >
                Главная страница
            </NavLink>
            <NavLink 
                to="/memeber"
                className={({ isActive }) => 
                    `nav-item ${isActive ? 'nav-item-active ' : ''}`
                }
            >
                Для участника
            </NavLink>
            <NavLink 
                to="/admin"
                className={({ isActive }) => 
                    `nav-item ${isActive ? 'nav-item-active ' : ''}`
                }
            >
                Для администратора
            </NavLink>
            <NavLink 
                to="/project-ideas"
                className={({ isActive }) => 
                    `nav-item ${isActive ? 'nav-item-active ' : ''}`
                }
            >
                Идеи
            </NavLink>
            <NavLink 
                to="/account" 
                className={({ isActive }) => 
                    `nav-item push-right ${isActive ? 'nav-item-active ' : ''}`
                }
            >
                Личный кабинет
                <img className='account-link-img' src={userIcon} alt="" />
            </NavLink>
        </nav>
    </header>
  );
};

export default Header;
