import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Distribution from "./distribution/Distribution";
import СurrentDistributions from "./current-distributions/СurrentDistributions";
import IncomingDistributions from "./incoming-distributions/IncomingDistributions";
import "./index.css";

const AdminPage = () => {
    const location = useLocation();
    const [selectedDistributionId, setSelectedDistributionId] = useState<number | null>(null);
    const [activeTab, setActiveTab] = useState<'create' | 'current' | 'past'>('current');

    // При получении ID из location.state
    useEffect(() => {
        if (location.state?.distributionId) {
            const timer = setTimeout(() => {
                setSelectedDistributionId(location.state.distributionId);
                setActiveTab('current');
            }, 0);
            
            return () => clearTimeout(timer);
        }
    }, [location.state]);

    // Функция для выбора распределения из списка
    const handleDistributionSelect = (id: number) => {
        setSelectedDistributionId(id);
    };

    // Функция при создании нового распределения
    const handleDistributionCreated = () => {
        // Просто переключаемся на вкладку текущих распределений
        setActiveTab('current');
        console.log(selectedDistributionId);
        setSelectedDistributionId(null); // Сбрасываем выбранное, чтобы показать список
    };

    return (
        <div className='admin-container'>
            <nav className='admin-links-container'>
                <button 
                    onClick={() => {
                        setActiveTab('create');
                        setSelectedDistributionId(null);
                    }}
                    className={activeTab === 'create' ? 'admin-nav-item-active' : 'admin-nav-item'}
                >
                    Создать распределение
                </button>
                <button 
                    onClick={() => {
                        setActiveTab('current');
                        setSelectedDistributionId(null);
                    }}
                    className={activeTab === 'current' ? 'admin-nav-item-active' : 'admin-nav-item'}
                >
                    Текущие распределения
                </button>
                <button 
                    onClick={() => {
                        setActiveTab('past');
                        setSelectedDistributionId(null);
                    }}
                    className={activeTab === 'past' ? 'admin-nav-item-active' : 'admin-nav-item'}
                >
                    Прошедшие распределения
                </button>
            </nav>
            
            <div className='admin-container-content'>
                {/* Вкладка создания */}
                {activeTab === 'create' && (
                    <Distribution onDistributionCreated={handleDistributionCreated} />
                )}
                
                {/* Вкладка текущих */}
                {activeTab === 'current' && (
                    selectedDistributionId ? (
                            <Distribution distributionId={selectedDistributionId} />
                    ) : (
                        <СurrentDistributions onDistributionSelect={handleDistributionSelect} />
                    )
                )}
                
                {/* Вкладка прошедших */}
                {activeTab === 'past' && <IncomingDistributions />}
            </div>
        </div>
    );
};

export default AdminPage;