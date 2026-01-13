import { useState } from 'react';
import Distribution from "./distribution/Distribution";
import СurrentDistributions from "./current-distributions/СurrentDistributions"
import IncomingDistributions from "./incoming-distributions/IncomingDistributions";

import "./index.css"


const AdminPage = () => {
    const [activeTab, setActiveTab] = useState<'create' | 'current' | 'past'>('create');

    return (
        <div className='admin-container'>
            <nav className='admin-links-container'>
                <button 
                    onClick={() => setActiveTab('create')}
                    className={activeTab === 'create' ? 'admin-nav-item-active' : 'admin-nav-item'}
                >
                    Создать распределение
                </button>
                <button 
                    onClick={() => setActiveTab('current')}
                    className={activeTab === 'current' ? 'admin-nav-item-active' : 'admin-nav-item'}
                >
                    Текущие распределения
                </button>
                <button 
                    onClick={() => setActiveTab('past')}
                    className={activeTab === 'past' ? 'admin-nav-item-active' : 'admin-nav-item'}
                >
                    Прошедшие распределения
                </button>
            </nav>
            <div className='admin-container-content'>
                {activeTab === 'create' && <Distribution />}
                {activeTab === 'current' && <СurrentDistributions />}
                {activeTab === 'past' && <IncomingDistributions />}
            </div>
        </div>
    );
};

export default AdminPage;