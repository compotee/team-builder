import { useState, useEffect } from 'react';
import UserDataForm from './components/UserDataForm';
import PasswordForm from './components/PasswordForm';
import CompetenceForm from './components/CompetenceForm';
import ConfirmModal from '../../components/confirm-modal/ConfirmModal';
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
        password: '*'.repeat(mockData.User.password.length)
    });

    const [competences, setCompetences] = useState<Competence[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState<'logout' | 'delete'>('logout');
    const navigate = useNavigate();

    useEffect(() => {
        const loadMockData = () => {
            const currentUser = mockData.User;
            
            setUserData({
                lastName: currentUser.lastName || '',
                firstName: currentUser.firstName || '',
                middleName: currentUser.middleName || '',
                login: currentUser.tgLink || currentUser.username || '',
                password: '*'.repeat(currentUser.password?.length || 0)
            });

            if (currentUser.competence && currentUser.competence.length > 0) {
                setCompetences(currentUser.competence);
            } else if (mockData.Competence) {
                setCompetences(mockData.Competence);
            }
        };
        
        loadMockData();
    }, []);  

    const handleLogoutClick = () => {
        setModalType('logout');
        setShowModal(true);
    };

    const handleDeleteClick = () => {
        setModalType('delete');
        setShowModal(true);
    };

    const handleConfirm = () => {
        if (modalType === 'logout') {
            navigate('/auth');
        } else {
            navigate('/');
        }
        setShowModal(false);
    };

    const handleCancel = () => {
        setShowModal(false);
    };

    const updateUserData = () => {
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
        setCompetences(mockData.Competence || []);
    };

    return (
        <>
            <div className='account-page-container'>
                <div className='personal-data-container'>
                    <UserDataForm userData={userData} onUpdate={updateUserData} />
                    <PasswordForm />
                    <div>
                        <button
                            className='button button--red right-margin-btn'
                            onClick={handleDeleteClick}
                        >
                            Удалить профиль
                        </button>
                        <button
                            className='button button--red'
                            onClick={handleLogoutClick}
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

            <ConfirmModal
                isOpen={showModal}
                type={modalType}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </>
    );
};

export default AccountPage;