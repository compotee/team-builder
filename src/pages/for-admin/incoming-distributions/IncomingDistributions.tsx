import { useState, useEffect } from 'react';
import FormedTeams from "../components/formed-teams/FormedTeams";
import { api, type Distribution } from '../../../api';
import "./IncomingDistributions.css"

const IncomingDistributions = () => {
    const [completedDistributions, setCompletedDistributions] = useState<Distribution[]>([]);
    const [selectedDistributionId, setSelectedDistributionId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDistributions = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await api.distributions.getAll();
                const distributions = response.distributions;
                const completedDistributions = distributions.filter(
                    (dist: Distribution) => dist.is_admin && dist.status === 'end'
                );
                setCompletedDistributions(completedDistributions);
                
                if (completedDistributions.length > 0) {
                    setSelectedDistributionId(completedDistributions[0].id);
                }
            } catch (err: unknown) {
                setError('Не удалось загрузить распределения');
                console.error('Failed to load distributions:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDistributions();
    }, []);

    const handleDistributionSelect = (id: number) => {
        setSelectedDistributionId(id);
    };

    const selectedDistribution = completedDistributions.find(
        dist => dist.id === selectedDistributionId
    );

    if (isLoading) {
        return <div className="no-completed-distributions">Загрузка...</div>;
    }

    if (error) {
        return <div className="no-completed-distributions">{error}</div>;
    }

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
                    <FormedTeams distributionId={selectedDistribution.id} />
                )}
            </div>
        </>
    );
};

export default IncomingDistributions;