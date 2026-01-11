import { NavLink } from 'react-router-dom';

import './Header.css'

import logo from '../../assets/team-builder-logo.svg';
import userIcon from '../../assets/user-icon.svg'

const Header = () => {
  return (
    <header className='header-container'>
        <nav className='links-container'>
            <NavLink 
                to="/" 
                className={({ isActive }) => 
                    `nav-item logo-nav ${isActive ? 'nav-item-active' : ''}`
                }
            >
                <img className='header-logo-img' src={logo} alt="" />
                TeamBuilder
            </NavLink>
            <NavLink 
                to="/make-team"
                className={({ isActive }) => 
                    `nav-item ${isActive ? 'nav-item-active ' : ''}`
                }
            >
                Главная страница
            </NavLink>
            <NavLink 
                to="/make-team"
                className={({ isActive }) => 
                    `nav-item ${isActive ? 'nav-item-active ' : ''}`
                }
            >
                Распределения
            </NavLink>
            <NavLink 
                to="/make-team"
                className={({ isActive }) => 
                    `nav-item ${isActive ? 'nav-item-active ' : ''}`
                }
            >
                Команда
            </NavLink>
            <NavLink 
                to="/make-team"
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
                <img className='header-logo-img logo-nav' src={userIcon} alt="" />
            </NavLink>
        </nav>
    </header>
  );
};

export default Header;
