import "./СurrentDistributions.css"
import linkIcon from "../../../assets/link-icon.svg"
import mockData from '../../../Mocks';

interface СurrentDistributionsProps {
  onDistributionSelect: (id: number) => void;
}

const СurrentDistributions: React.FC<СurrentDistributionsProps> = ({ onDistributionSelect }) => {
  // Фильтруем распределения админа
  const adminDistributions = mockData.Distributions.filter(dist => dist.is_admin);
  
  // Разделяем на сформированные и несформированные
  const completedDistributions = adminDistributions.filter(dist => dist.status === 'completed' || dist.status === 'end');
  const activeDistributions = adminDistributions.filter(dist => dist.status === 'active');
  
  const handleDistributionClick = (id: number) => {
    onDistributionSelect(id);
  };

  return (
    <div className="current-distributions-container">
      {/* Сформированные распределения */}
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

      {/* Несформированные распределения */}
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

      {adminDistributions.length === 0 && (
        <p className="no-distributions-message">У вас нет распределений для администрирования</p>
      )}
    </div>
  );
};

export default СurrentDistributions;