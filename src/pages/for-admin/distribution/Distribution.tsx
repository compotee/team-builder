import { useState, useEffect } from "react";
import CreatingDistribution from "./creating-distribution/CreatingDistribution";
import JoinedMembers from "./joined-members/JoinedMembers";
import FormedTeams from "../components/formed-teams/FormedTeams";
import { api, type Distribution as DistributionType } from "../../../api";
import "./Distribution.css"
import distributionImg from "../../../assets/distribution-img.svg"

interface DistributionProps {
    distributionId?: number;
    onDistributionCreated?: () => void;
}

const Distribution: React.FC<DistributionProps> = ({ distributionId, onDistributionCreated }) => {
    const isNewDistribution = !distributionId;
    
    const [activeTab, setActiveTab] = useState<'create' | 'awaiting' | 'passed'>(
        isNewDistribution ? 'create' : 'awaiting'
    );
    const [distribution, setDistribution] = useState<DistributionType | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (distributionId) {
            const fetchDistribution = async () => {
                setIsLoading(true);
                try {
                    const response = await api.distributions.getById(distributionId);
                    setDistribution(response);
                    
                    if (response.status === 'completed' || response.status === 'end') {
                        setActiveTab('passed');
                    } else if (response.status === 'active') {
                        setActiveTab('awaiting');
                    }
                } catch (err: unknown) {
                    console.error('Failed to load distribution:', err);
                } finally {
                    setIsLoading(false);
                }
            };
            
            fetchDistribution();
        }
    }, [distributionId]);

    const isTabEnabled = (tab: 'create' | 'awaiting' | 'passed'): boolean => {
        if (isNewDistribution) {
            return tab === 'create';
        }
        
        if (!distribution) return false;
        
        switch(tab) {
            case 'create':
                return true;
            case 'awaiting':
                return distribution.status === 'active';
            case 'passed':
                return distribution.status === 'completed' || distribution.status === 'end';
            default:
                return false;
        }
    };

    const getTabClass = (tab: 'create' | 'awaiting' | 'passed') => {
        const baseClass = activeTab === tab ? 'distribution-nav-item-active' : 'distribution-nav-item';
        const isEnabled = isTabEnabled(tab);
        
        if (!isEnabled) {
            return `${baseClass} disabled`;
        }
        return baseClass;
    };

    const handleTabClick = (tab: 'create' | 'awaiting' | 'passed') => {
        if (isTabEnabled(tab)) {
            setActiveTab(tab);
        }
    };

    if (isLoading) {
        return <div>Загрузка...</div>;
    }

    return (
        <>
            <nav className="distribution-nav">
                <button
                    onClick={() => handleTabClick('create')}
                    className={getTabClass('create')}
                    disabled={!isTabEnabled('create')}
                >
                    <div className={activeTab === 'create' ? 'circle-active' : 'circle'}></div>
                    <p className="distribution-nav-item-text">Параметры распределения</p>
                </button>
                
                {Array(7).fill(null).map((_, index) => (
                    <div key={index} className="little-circle"></div>
                ))}
                
                <button
                    onClick={() => handleTabClick('awaiting')}
                    className={getTabClass('awaiting')}
                    disabled={!isTabEnabled('awaiting')}
                >
                    <div className={activeTab === 'awaiting' ? 'circle-active' : 'circle'}></div>
                    <p className="distribution-nav-item-text">Присоединившиеся участники</p>
                </button>
                
                {Array(7).fill(null).map((_, index) => (
                    <div key={index} className="little-circle"></div>
                ))}
                
                <button
                    onClick={() => handleTabClick('passed')}
                    className={getTabClass('passed')}
                    disabled={!isTabEnabled('passed')}
                >
                    <div className={activeTab === 'passed' ? 'circle-active' : 'circle'}></div>
                    <p className="distribution-nav-item-text">Сформированные команды</p>
                </button>
                
                <img className="distribution-nav-img" src={distributionImg} alt="" />
            </nav>
            
            <div className="distribution-content">
                {activeTab === 'create' && (
                    <CreatingDistribution 
                        distributionId={distributionId}
                        distribution={distribution}
                        onDistributionCreated={onDistributionCreated}
                    />
                )}
                {activeTab === 'awaiting' && distributionId && (
                    <JoinedMembers distributionId={distributionId} />
                )}
                {activeTab === 'passed' && distributionId && (
                    <FormedTeams distributionId={distributionId} />
                )}
            </div>
        </>
    );
};

export default Distribution;