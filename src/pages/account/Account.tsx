import { useState, useEffect } from 'react';
import UserDataForm from './components/UserDataForm';
import PasswordForm from './components/PasswordForm';
import CompetenceForm from './components/CompetenceForm';
import ConfirmModal from '../../components/confirm-modal/ConfirmModal';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api';
import './Account.css';
import backgroundImg from '../../assets/account-page-img.svg'

interface Competence {
  id: number;
  role: string;
  stack: string;
  experience: string;
}

const AccountPage = () => {
    const [userData, setUserData] = useState({
        lastName: '',
        firstName: '',
        middleName: '',
        login: '',
        password: ''
    });

    const [competences, setCompetences] = useState<Competence[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState<'logout' | 'delete'>('logout');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [userResponse, formsResponse] = await Promise.all([
                    api.user.getMe(),
                    api.forms.getAll()
                ]);
                
                setUserData({
                    lastName: userResponse.lastName || '',
                    firstName: userResponse.firstName || '',
                    middleName: userResponse.middleName || '',
                    login: userResponse.tgLink || '',
                    password: '********'
                });
                
                const forms = formsResponse.forms.map(form => ({
                    id: form.id,
                    role: form.role,
                    stack: form.skills.join(', '),
                    experience: form.experience
                }));
                setCompetences(forms);
            } catch (error) {
                console.error('Failed to load data:', error);
            }
        };
        
        fetchData();
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

    const refetchData = async () => {
        try {
            const [userResponse, formsResponse] = await Promise.all([
                api.user.getMe(),
                api.forms.getAll()
            ]);
            
            setUserData({
                lastName: userResponse.lastName || '',
                firstName: userResponse.firstName || '',
                middleName: userResponse.middleName || '',
                login: userResponse.tgLink || '',
                password: '********'
            });
            
            const forms = formsResponse.forms.map(form => ({
                id: form.id,
                role: form.role,
                stack: form.skills.join(', '),
                experience: form.experience
            }));
            setCompetences(forms);
        } catch (error) {
            console.error('Failed to refetch data:', error);
        }
    };


    return (
        <>
            <div className='account-page-container'>
                <div className='personal-data-container'>
                    <UserDataForm userData={userData} onUpdate={refetchData} />
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
                        onUpdate={refetchData}
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