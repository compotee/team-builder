import { useState, useEffect } from 'react';
import "./CreatingDistribution.css"
import questionIcon from "../../../../assets/question-icon.svg"
import { api, type CreateDistributionData, type Role, type Distribution } from '../../../../api';

interface CreatingDistributionProps {
  distributionId?: number;
  distribution?: Distribution;
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
    isEditMode ? [...distribution.possible_roles] : []
  );
  const [distributionDate, setDistributionDate] = useState(isEditMode ? distribution.auto_finish_date : '');
  const [distributionTime, setDistributionTime] = useState(isEditMode ? distribution.auto_finish_time : '18:00');
  const [projectEndDate, setProjectEndDate] = useState(isEditMode ? distribution.team_expiry_date : '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const availableRoles: Role[] = ['Тимлид', 'Аналитик', 'Дизайнер', 'Frontend-разработчик', 'Backend-разработчик'];

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
      }, 2000);
      
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditMode) return;
    
    setIsSubmitting(true);
    setError(null);

    try {
      const chosenRoles = selectedRoles.filter(role => role.trim() !== '').slice(0, parseInt(membersCount) || 5);
      const possible_roles = chosenRoles.length > 0 ? chosenRoles as Role[] : availableRoles;

      const distributionData: CreateDistributionData = {
        name: name.trim() || 'Новое распределение',
        max_members_team: parseInt(membersCount) || 5,
        possible_roles: possible_roles,
        auto_finish_date: distributionDate,
        auto_finish_time: distributionTime,
        team_expiry_date: projectEndDate
      };

      await api.distributions.create(distributionData);
      
      setShowSuccessMessage(true);

    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Ошибка при создании распределения';
      setError(errorMessage);
      console.error('Ошибка при создании распределения:', err);
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
        {error && <p style={{ color: '#B80205'}}>{error}</p>}
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