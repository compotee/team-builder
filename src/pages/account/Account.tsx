import { useState, useEffect } from 'react';
import UserDataForm from './components/UserDataForm';
import PasswordForm from './components/PasswordForm';
import CompetenceForm from './components/CompetenceForm';

import './Account.css';


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

    useEffect(() => {
        const loadData = async () => {
        try {
            // Загружаем данные пользователя
            const userResponse = await fetch('/api/user/profile', {
            credentials: 'include'
            });
            if (userResponse.ok) {
            const userData = await userResponse.json();
            setUserData({
                lastName: userData.last_name || '',
                firstName: userData.first_name || '',
                middleName: userData.middle_name || '',
                login: userData.tg_link || userData.username || '',
                password: '********'
            });
            }

            const competencesResponse = await fetch('/api/user/competences', {
            credentials: 'include'
            });
            if (competencesResponse.ok) {
            const competencesData = await competencesResponse.json();
            setCompetences(competencesData);
            }
        } catch (error) {
            console.error('Ошибка загрузки данных:', error);
        }};

        loadData();
    }, []); 

    const handleLogout = async () => {
        try {
        const response = await fetch('/api/auth/logout', {
            method: 'POST',
            credentials: 'include'
        });
        
        if (response.ok) {
            window.location.href = '/login';
        }
        } catch (error) {
        console.error('Ошибка выхода:', error);
        }
    };

    const handleDeleteProfile = async () => {
        if (!window.confirm('Вы уверены, что хотите удалить профиль?')) {
        return;
        }
        
        try {
        const response = await fetch('/api/user/profile', {
            method: 'DELETE',
            credentials: 'include'
        });
        
        if (response.ok) {
            window.location.href = '/';
        }
        } catch (error) {
        console.error('Ошибка удаления профиля:', error);
        }
    };

    const updateUserData = async () => {
        try {
        const response = await fetch('/api/user/profile', {
            credentials: 'include'
        });
        if (response.ok) {
            const userData = await response.json();
            setUserData({
            lastName: userData.last_name || '',
            firstName: userData.first_name || '',
            middleName: userData.middle_name || '',
            login: userData.tg_link || userData.username || '',
            password: '********'
            });
        }
        } catch (error) {
        console.error('Ошибка обновления данных пользователя:', error);
        }
    };

    const updateCompetences = async () => {
        try {
        const response = await fetch('/api/user/competences', {
            credentials: 'include'
        });
        if (response.ok) {
            const competencesData = await response.json();
            setCompetences(competencesData);
        }
        } catch (error) {
        console.error('Ошибка обновления компетенций:', error);
        }
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
          <img src="/assets/account-page-img.svg" alt="" />
        </div>
      </div>
    </div>
    );
};

export default AccountPage;