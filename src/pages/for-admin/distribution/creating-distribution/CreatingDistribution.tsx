import { useState, useEffect } from 'react';
import "./CreatingDistribution.css"
import mockData from '../../../../Mocks';
import questionIcon from "../../../../assets/question-icon.svg"


interface Distribution {
  id: number;
  name: string;
  max_members_team: number;
  possible_roles: string[];
  status: string;
  auto_finish_date: string;
  auto_finish_time: string;
  team_expiry_date: string;
  invite_link: string;
  is_admin: boolean;
}

interface CreatingDistributionProps {
  distributionId?: number;
  distribution?: Distribution | null;
  onDistributionCreated?: () => void;
}

const CreatingDistribution: React.FC<CreatingDistributionProps> = ({ 
  distributionId, 
  distribution,
  onDistributionCreated 
}) => {
  const isEditMode = !!distributionId && !!distribution;
  
  const [name, setName] = useState(isEditMode ? distribution.name : '');
  const [membersCount, setMembersCount] = useState(isEditMode ? distribution.max_members_team.toString() : "5");
  const [selectedRoles, setSelectedRoles] = useState<string[]>(
    isEditMode ? [...distribution.possible_roles] : Array(5).fill('')
  );
  const [distributionDate, setDistributionDate] = useState(isEditMode ? distribution.auto_finish_date : '');
  const [distributionTime, setDistributionTime] = useState(isEditMode ? distribution.auto_finish_time : '18:00');
  const [projectEndDate, setProjectEndDate] = useState(isEditMode ? distribution.team_expiry_date : '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const availableRoles = mockData.Role || ['Тимлид', 'Аналитик', 'Дизайнер', 'Frontend-разработчик', 'Backend-разработчик'];

  useEffect(() => {
    if (isEditMode && distribution) {
      setName(distribution.name);
      setMembersCount(distribution.max_members_team.toString());
      setSelectedRoles([...distribution.possible_roles]);
      setDistributionDate(distribution.auto_finish_date);
      setDistributionTime(distribution.auto_finish_time);
      setProjectEndDate(distribution.team_expiry_date);
    }
  }, [distribution, isEditMode]);

  useEffect(() => {
    if (showSuccessMessage) {
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
        if (onDistributionCreated) {
          onDistributionCreated();
        }
      }, 2000); // 2 секунды
      
      return () => clearTimeout(timer);
    }
  }, [showSuccessMessage, onDistributionCreated]);

  const handleMembersCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isEditMode) return;
    
    const value = e.target.value;
    
    if (value === '' || /^\d+$/.test(value)) {
      const count = value === '' ? 0 : parseInt(value);
      setMembersCount(value);
      
      if (count > selectedRoles.length) {
        setSelectedRoles([...selectedRoles, ...Array(count - selectedRoles.length).fill('')]);
      } else if (count < selectedRoles.length) {
        setSelectedRoles(selectedRoles.slice(0, count));
      }
    }
  };

  const handleRoleChange = (index: number, value: string) => {
    if (isEditMode) return;
    
    const newSelectedRoles = [...selectedRoles];
    newSelectedRoles[index] = value;
    setSelectedRoles(newSelectedRoles);
  };

  const generateInviteLink = () => {
    const randomString = Math.random().toString(36).substring(2, 8);
    return `invite-${randomString}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);

    try {
      const currentDistributions = mockData.Distributions || [];
      const existingIds = currentDistributions.map(dist => dist.id);
      const newId = existingIds.length > 0 ? Math.max(...existingIds) + 1 : 1;

      const auto_finish_date = distributionDate || new Date().toISOString().split('T')[0];
      const auto_finish_time = distributionTime || '18:00';
      const team_expiry_date = projectEndDate || new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      const chosenRoles = selectedRoles.filter(role => role.trim() !== '').slice(0, parseInt(membersCount) || 5);
      const possible_roles = chosenRoles.length > 0 ? chosenRoles : availableRoles;

      const newDistribution: Distribution = {
        id: newId,
        name: name.trim() || 'Новое распределение',
        max_members_team: parseInt(membersCount) || 5,
        possible_roles: possible_roles,
        status: 'active',
        auto_finish_date,
        auto_finish_time,
        team_expiry_date,
        invite_link: generateInviteLink(),
        is_admin: true
      };

      mockData.Distributions.push(newDistribution);
      
      // Показываем сообщение об успехе
      setShowSuccessMessage(true);

    } catch (error) {
      console.error('Ошибка при создании распределения:', error);
      // Можно показать сообщение об ошибке другим способом, если нужно
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = name.trim() !== '' && 
    parseInt(membersCount) > 0 && 
    selectedRoles.some(role => role.trim() !== '');

  const selects = Array.from({ length: parseInt(membersCount) || 5 }, (_, index) => (
    <select 
      key={index} 
      value={selectedRoles[index] || ''}
      onChange={(e) => handleRoleChange(index, e.target.value)}
      className={`grey-select ${isEditMode ? 'disabled' : ''}`}
      disabled={isEditMode}
    >
      <option value="">Выберите роль</option>
      {availableRoles.map((role, roleIndex) => (
        <option key={roleIndex} value={role}>{role}</option>
      ))}
    </select>
  ));

  const title = isEditMode ? 'Параметры распределения' : 'Создание распределения';

  return (
    <form className='creating-distribution-container' onSubmit={handleSubmit}>
      <p className='creating-distribution-container-title'>{title}</p>
      
      <div className='creating-distribution-container_field'>
        <span className='creating-distribution-container_field-title'>Название группы</span>
        <input
          className={`creating-distribution-container_field-input ${isEditMode ? 'disabled grey-input' : 'grey-input'}`}
          value={name}
          onChange={(e) => !isEditMode && setName(e.target.value)}
          placeholder='Введите название'
          required
          readOnly={isEditMode}
        />
      </div>
      
      <div className='creating-distribution-container_field'>
        <span className='creating-distribution-container_field-title'>Кол-во ролей в команде</span>
        <input 
          className={`creating-distribution-container_field-input ${isEditMode ? 'disabled grey-input' : 'grey-input'}`}
          type="number" 
          value={membersCount} 
          onChange={handleMembersCountChange}
          min="1"
          max="20"
          required
          readOnly={isEditMode}
        />
      </div>
      
      <p className='creating-distribution-container-title'>2. Выберите роли, которые необходимы в проекте</p>
      {selects}
      
      <p className='creating-distribution-container-title'>3. Заполните данные о временных метриках распределения</p>
      
      <div className='creating-distribution-container_field'>
        <span className='creating-distribution-container_field-title'>Дата распределения</span>
        <input 
          className={`creating-distribution-container_field-input ${isEditMode ? 'disabled grey-input' : 'grey-input'}`}
          type="date" 
          value={distributionDate}
          onChange={(e) => !isEditMode && setDistributionDate(e.target.value)}
          min={new Date().toISOString().split('T')[0]}
          required
          readOnly={isEditMode}
        />
      </div>
      
      <div className='creating-distribution-container_field'>
        <span className='creating-distribution-container_field-title'>Время распределения</span>
        <input 
          className={`creating-distribution-container_field-input ${isEditMode ? 'disabled grey-input' : 'grey-input'}`}
          type="time" 
          value={distributionTime}
          onChange={(e) => !isEditMode && setDistributionTime(e.target.value)}
          required
          readOnly={isEditMode}
        />
      </div>
      
      <div className='creating-distribution-container_field'>
        <span className='creating-distribution-container_field-title'>Дата окончания проектов</span>
        <div 
            className="tooltip-container"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onClick={() => setShowTooltip(!showTooltip)}
          >
            <img 
              src={questionIcon} 
              alt="Подсказка" 
              className="question-icon"
            />
            {showTooltip && (
              <div className="tooltip-content">
                По наступлению даты окончания проектов распределение переходит из текущих в прошедшие
              </div>
            )}
        </div>
        <input 
          className={`creating-distribution-container_field-input ${isEditMode ? 'disabled grey-input' : 'grey-input'}`}
          type="date" 
          value={projectEndDate}
          onChange={(e) => !isEditMode && setProjectEndDate(e.target.value)}
          min={distributionDate || new Date().toISOString().split('T')[0]}
          required
          readOnly={isEditMode}
        />
      </div>

      <div className='password-save-div'>
        {showSuccessMessage && (
          <p style={{ color: '#005529'}}>
            Распределение успешно запущено!
          </p>
        )}
      
        <div>
          <button 
            type="submit"
            className={`button ${isEditMode ? 'button--inactive' : (isFormValid ? 'button--active' : 'button--inactive-pending')}`}
            disabled={isEditMode || !isFormValid || isSubmitting || showSuccessMessage}
          >
            {isSubmitting ? 'Создание...' : 
            isEditMode ? 'Распределение запущено' : 'Запустить распределение'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreatingDistribution;