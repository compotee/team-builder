import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Distribution from "./distribution/Distribution";
import CurrentDistributions from "./current-distributions/СurrentDistributions";
import IncomingDistributions from "./incoming-distributions/IncomingDistributions";
import "./index.css";

const AdminPage = () => {
    const location = useLocation();
    const [selectedDistributionId, setSelectedDistributionId] = useState<number | null>(null);
    const [activeTab, setActiveTab] = useState<'create' | 'current' | 'past'>('current');
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const initializeState = () => {
            if (location.state?.distributionId) {
                setSelectedDistributionId(location.state.distributionId);
                setActiveTab('current');
            }
            setIsInitialized(true);
        };

        if (!isInitialized) {
            const timer = setTimeout(initializeState, 0);
            return () => clearTimeout(timer);
        }
    }, [location.state, isInitialized]);

    const handleDistributionSelect = (id: number) => {
        setSelectedDistributionId(id);
    };

    const handleDistributionCreated = () => {
        setActiveTab('current');
        setSelectedDistributionId(null);
    };

    if (!isInitialized) {
        return <div>Загрузка...</div>;
    }

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
                {activeTab === 'create' && (
                    <Distribution onDistributionCreated={handleDistributionCreated} />
                )}
                
                {activeTab === 'current' && (
                    selectedDistributionId ? (
                        <Distribution distributionId={selectedDistributionId} />
                    ) : (
                        <CurrentDistributions onDistributionSelect={handleDistributionSelect} />
                    )
                )}
                
                {activeTab === 'past' && <IncomingDistributions />}
            </div>
        </div>
    );
};

export default AdminPage;