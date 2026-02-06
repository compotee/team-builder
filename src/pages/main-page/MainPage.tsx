import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { api, type Distribution } from '../../api';
import "./MainPage.css"

import logo from '../../assets/team-builder-logo.svg';
import linkIcon from '../../assets/link-icon.svg'
import teamImg from '../../assets/main-page-team-img.svg'

const MainPage = () => {
    const navigate = useNavigate();

    const [userDistributions, setUserDistributions] = useState<Distribution[]>([]);
    const [adminDistributions, setAdminDistributions] = useState<Distribution[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDistributions = async () => {
            setError(null);
            try {
                const response = await api.distributions.getAll();
                const distributions = response.distributions;
                
                const userDists = distributions.filter((dist: Distribution) => !dist.is_admin);
                const adminDists = distributions.filter((dist: Distribution) => dist.is_admin);
                
                setUserDistributions(userDists);
                setAdminDistributions(adminDists);
            } catch {
                setError('Не удалось загрузить распределения');
            }
        };

        fetchDistributions();
    }, []);

    const handleDistributionClick = (id: number) => {
        navigate('/memeber', { state: { distributionId: id } });
    };

    const handleAdminDistributionClick = (id: number) => {
        navigate('/admin', { state: { distributionId: id } });
    };

    if (error) {
        return <div className="main-page-container">{error}</div>;
    }

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
                        {
                            userDistributions.length === 0 
                            ? (
                                <p className="landing-info-text">Вы пока не участвуете в распределениях</p>
                            ) : (
                                userDistributions.map(dist => (
                                    <div 
                                        key={dist.id} 
                                        className="main-page-teams-item-team"
                                        onClick={() => handleDistributionClick(dist.id)}
                                    >
                                        <div className="main-page-teams-item-team-title">{dist.name}</div>
                                        <button 
                                            className="main-page-teams-item-team-btn"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDistributionClick(dist.id);
                                            }}
                                        >
                                            <img src={linkIcon} alt="Перейти" />
                                        </button>
                                    </div>
                                ))
                            )
                        }
                    </div>
                    <div className="main-page-teams-item">
                        <h3 className="main-page-teams-item-title">Администрируемые мной распределения</h3>
                        {
                            adminDistributions.length === 0 
                            ? (
                                <p className="landing-info-text">Вы пока не администрируете распределения</p>
                            ) : (
                                adminDistributions.map(dist => (
                                    <div 
                                        key={dist.id} 
                                        className="main-page-teams-item-team"
                                        onClick={() => handleAdminDistributionClick(dist.id)}
                                    >
                                        <div className="main-page-teams-item-team-title">{dist.name}</div>
                                        <button 
                                            className="main-page-teams-item-team-btn"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleAdminDistributionClick(dist.id);
                                            }}
                                        >
                                            <img src={linkIcon} alt="Перейти" />
                                        </button>
                                    </div>
                                ))
                            )
                        }
                    </div>
                </div>
                <img src={teamImg} alt="" />
            </div>
        </div>
    );
};

export default MainPage;