import { useState } from 'react';
import FormedTeams from "../components/formed-teams/FormedTeams";
import mockData from '../../../Mocks';
import "./IncomingDistributions.css"

const IncomingDistributions = () => {
    // Фильтруем завершенные распределения админа (status: 'end')
    const completedDistributions = mockData.Distributions.filter(
        dist => dist.is_admin && dist.status === 'end'
    );

    // Выбираем первое распределение по умолчанию, если есть
    const [selectedDistributionId, setSelectedDistributionId] = useState<number | null>(
        completedDistributions.length > 0 ? completedDistributions[0].id : null
    );

    const selectedDistribution = completedDistributions.find(
        dist => dist.id === selectedDistributionId
    );

    const handleDistributionSelect = (id: number) => {
        setSelectedDistributionId(id);
    };

    if (completedDistributions.length === 0) {
        return (
            <div className="no-completed-distributions">
                У вас нет завершенных распределений
            </div>
        );
    }

    return (
        <>
            <nav className="incoming-distributions-nav">
                {completedDistributions.map(dist => (
                    <button
                        key={dist.id}
                        className={`incoming-distributions-nav-button ${
                            selectedDistributionId === dist.id ? 'active' : ''
                        }`}
                        onClick={() => handleDistributionSelect(dist.id)}
                    >
                        {dist.name}
                    </button>
                ))}
            </nav>
            <div className="incoming-distributions-content">
                {selectedDistribution && (
                    <FormedTeams distribution={selectedDistribution} />
                )}
            </div>
        </>
    );
};

export default IncomingDistributions;