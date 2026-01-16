import { useState } from "react";
import CreatingDistribution from "./creating-distribution/CreatingDistribution";
import JoinedMembers from "./joined-members/JoinedMembers";
import FormedTeams from "../components/formed-teams/FormedTeams";

import "./Distribution.css"

import distributionImg from "../../../assets/distribution-img.svg"


const Distribution = () => {
    const [activeTab, setActiveTab] = useState<'create' | 'awaiting' | 'passed'>('create');


    return (
        <>
            <nav className="distribution-nav">
                <button
                    onClick={() => setActiveTab('create')}
                    className={activeTab === 'create' ? 'distribution-nav-item-active' : 'distribution-nav-item'}
                >
                    <div className={activeTab === 'create' ? 'circle-active' : 'circle'}></div>
                    <p className="distribution-nav-item-text">Параметры распределения</p>
                </button>
                {Array(7).fill(null).map((_, index) => (
                    <div key={index} className="little-circle"></div>
                ))}
                <button
                    onClick={() => setActiveTab('awaiting')}
                    className={activeTab === 'awaiting' ? 'distribution-nav-item-active' : 'distribution-nav-item'}
                >
                    <div className={activeTab === 'awaiting' ? 'circle-active' : 'circle'}></div>
                    <p className="distribution-nav-item-text">Присоединившиеся участники</p>
                </button>
                {Array(7).fill(null).map((_, index) => (
                    <div key={index} className="little-circle"></div>
                ))}
                <button
                    onClick={() => setActiveTab('passed')}
                    className={activeTab === 'passed' ? 'distribution-nav-item-active' : 'distribution-nav-item'}
                >
                    <div className={activeTab === 'passed' ? 'circle-active' : 'circle'}></div>
                    <p className="distribution-nav-item-text">Сформированные команды</p>
                </button>
                <img className="distribution-nav-img" src={distributionImg} alt="" />
            </nav>
            <div className="distribution-content">
                {activeTab === 'create' && <CreatingDistribution />}
                {activeTab === 'awaiting' && <JoinedMembers />}
                {activeTab === 'passed' && <FormedTeams />}
            </div>
        </>
    );
};

export default Distribution;