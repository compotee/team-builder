import { useState, useEffect } from 'react';
import "./СurrentDistributions.css"
import linkIcon from "../../../assets/link-icon.svg"
import { api, type Distribution } from '../../../api';

interface СurrentDistributionsProps {
  onDistributionSelect: (id: number) => void;
}

const CurrentDistributions: React.FC<СurrentDistributionsProps> = ({ onDistributionSelect }) => {
  const [adminDistributions, setAdminDistributions] = useState<Distribution[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDistributions = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await api.distributions.getAll();
        const distributions = response.distributions;
        const adminDistributions = distributions.filter((dist: Distribution) => dist.is_admin);
        setAdminDistributions(adminDistributions);
      } catch (err: unknown) {
        setError('Не удалось загрузить распределения');
        console.error('Failed to load distributions:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDistributions();
  }, []);

  const handleDistributionClick = (id: number) => {
    onDistributionSelect(id);
  };

  const completedDistributions = adminDistributions.filter(dist => dist.status === 'completed' || dist.status === 'end');
  const activeDistributions = adminDistributions.filter(dist => dist.status === 'active');

  if (isLoading) {
    return <div className="current-distributions-container">Загрузка...</div>;
  }

  if (error) {
    return <div className="current-distributions-container">{error}</div>;
  }

  return (
    <div className="current-distributions-container">
      {activeDistributions.length > 0 && (
        <ul className="distributions-list">
          <li className="distributions-list_title">Команды не сформированы</li>
          {activeDistributions.map(dist => (
            <li key={dist.id} className="distributions-list_item">
              <div className="distributions-list_item-name">{dist.name}</div>
              <button 
                className="distributions-list_item-link"
                onClick={() => handleDistributionClick(dist.id)}
              >
                <img className="distributions-list_item-link-img" src={linkIcon} alt="" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {completedDistributions.length > 0 && (
        <ul className="distributions-list">
          <li className="distributions-list_title">Команды сформированы</li>
          {completedDistributions.map(dist => (
            <li key={dist.id} className="distributions-list_item">
              <div className="distributions-list_item-name">{dist.name}</div>
              <button 
                className="distributions-list_item-link"
                onClick={() => handleDistributionClick(dist.id)}
              >
                <img className="distributions-list_item-link-img" src={linkIcon} alt="" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {adminDistributions.length === 0 && (
        <p className="no-distributions-message">У вас нет распределений для администрирования</p>
      )}
    </div>
  );
};

export default CurrentDistributions;