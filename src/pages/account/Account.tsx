import { useState, useEffect } from 'react';
import UserDataForm from './components/UserDataForm';
import PasswordForm from './components/PasswordForm';
import CompetenceForm from './components/CompetenceForm';
import mockData from '../../Mocks'
import { useNavigate } from 'react-router-dom';

import './Account.css';
import backgroundImg from '../../assets/account-page-img.svg'

interface UserData {
  lastName: string;
  firstName: string;
  middleName: string;
  login: string;
  password: string;
}

interface Competence {
  id: number;
  role: string;
  stack: string;
  experience: string;
}

const AccountPage = () => {
    const [userData, setUserData] = useState<UserData>({
        lastName: '',
        firstName: '',
        middleName: '',
        login: '',
        password: '********'
    });

    const [competences, setCompetences] = useState<Competence[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Загружаем данные из mock
        const loadMockData = () => {
            const currentUser = mockData.User;
            
            setUserData({
                lastName: currentUser.lastName || '',
                firstName: currentUser.firstName || '',
                middleName: currentUser.middleName || '',
                login: currentUser.tgLink || currentUser.username || '',
                password: '********'
            });

            if (currentUser.competence && currentUser.competence.length > 0) {
                setCompetences(currentUser.competence);
            } else if (mockData.Competence) {
                setCompetences(mockData.Competence);
            }
        };
        
        loadMockData();
    }, []);  

    const handleLogout = () => {
        // Просто перенаправляем на страницу логина
        navigate('/login');
    };

    const handleDeleteProfile = () => {
        if (!window.confirm('Вы уверены, что хотите удалить профиль? Это действие нельзя отменить.')) {
            return;
        }
        
        // В демо-режиме просто показываем сообщение
        alert('В демо-режиме удаление профиля недоступно');
    };

    const updateUserData = () => {
        // В демо-режине обновляем данные из mock
        const currentUser = mockData.User;
        setUserData({
            lastName: currentUser.lastName || '',
            firstName: currentUser.firstName || '',
            middleName: currentUser.middleName || '',
            login: currentUser.tgLink || currentUser.username || '',
            password: '********'
        });
    };

    const updateCompetences = () => {
        // В демо-режине обновляем компетенции из mock
        setCompetences(mockData.Competence || []);
    };

    return (
        <div className='account-page-container'>
            <div className='personal-data-container'>
                <UserDataForm userData={userData} onUpdate={updateUserData} />
                <PasswordForm />
                <div>
                    <button
                        className='button button--red right-margin-btn'
                        onClick={handleDeleteProfile}
                    >
                        Удалить профиль
                    </button>
                    <button
                        className='button button--red'
                        onClick={handleLogout}
                    >
                        Выйти из аккаунта
                    </button>
                </div>
            </div>
            <div className='competencies'>
                <CompetenceForm 
                    competences={competences}
                    onUpdate={updateCompetences}
                />
                
                <div className='background-image'>
                    <img src={backgroundImg} alt="" />
                </div>
            </div>
        </div>
    );
};

export default AccountPage;