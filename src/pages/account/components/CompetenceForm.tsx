import { useState, useEffect } from 'react';
import pencilIcon from "../../../assets/pencil-icon.svg";
import arrow from "../../../assets/arrow.svg";
import mockData from '../../../Mocks';

interface Competence {
  id: number;
  role: string;
  stack: string;
  experience: string;
}

interface CompetenceFormProps {
  competences: Competence[];
  onUpdate: () => void;
}

const CompetenceForm = ({ competences, onUpdate }: CompetenceFormProps) => {
  const [currentCompetenceIndex, setCurrentCompetenceIndex] = useState(0);
  
  // Инициализируем текущую компетенцию
  const getInitialCompetence = () => {
    if (competences.length > 0) {
      return competences[0];
    }
    return { id: 4, role: '', stack: '', experience: '' };
  };
  
  const [currentCompetence, setCurrentCompetence] = useState<Competence>(getInitialCompetence());

  // Обновляем currentCompetence при изменении competences или currentCompetenceIndex
  useEffect(() => {
    if (competences.length > 0 && currentCompetenceIndex < competences.length) {
      setCurrentCompetence(competences[currentCompetenceIndex]);
    }
  }, [competences, currentCompetenceIndex]);

  const handleCompetenceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: keyof Competence) => {
    const { value } = e.target;
    setCurrentCompetence(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const saveCompetence = () => {
    // В демо-режине просто показываем сообщение
    alert('В демо-режиме сохранение компетенций недоступно');
    
    // Если нужно обновить UI без сохранения
    onUpdate();
  };

  const deleteCompetence = () => {
    if (competences.length === 0) return;

    if (!window.confirm('Вы уверены, что хотите удалить компетенцию?')) {
      return;
    }

    // В демо-режине просто показываем сообщение
    alert('В демо-режиме удаление компетенций недоступно');
    
    // Если нужно обновить UI без сохранения
    onUpdate();
  };

  const nextCompetence = () => {
    if (currentCompetenceIndex < competences.length - 1) {
      setCurrentCompetenceIndex(prev => prev + 1);
    }
  };

  const prevCompetence = () => {
    if (currentCompetenceIndex > 0) {
      setCurrentCompetenceIndex(prev => prev - 1);
    }
  };

  const isCompetenceValid = 
    currentCompetence.role && 
    currentCompetence.stack && 
    currentCompetence.experience;

  return (
    <div className='competencies-form'>
      <h3 className='competencies-form_titile'>Ваши компетенции</h3>
      
      <select
        name="role"
        className='competencies-form_item competencies-form_select'
        value={currentCompetence.role}
        onChange={(e) => handleCompetenceChange(e, 'role')}
      >
        <option value="">Выберите роль</option>
        {mockData.Role.map((role, index) => (
          <option key={index} value={role}>{role}</option>
        ))}
      </select>

      <div className="competencies-form_item">
        <input
          className="competencies-form_input"
          value={currentCompetence.stack}
          onChange={(e) => handleCompetenceChange(e, 'stack')}
          placeholder='Стэк (например: React, TypeScript)'
        />
        <button type="button">
          <img src={pencilIcon} alt="Редактировать" />
        </button>
      </div>

      <select
        name="experience"
        className='competencies-form_item competencies-form_select'
        value={currentCompetence.experience}
        onChange={(e) => handleCompetenceChange(e, 'experience')}
      >
        <option value="">Выберите опыт</option>
        {mockData.Experience.map((exp, index) => (
          <option key={index} value={exp}>{exp}</option>
        ))}
      </select>

      <div>
        <button
          className={`button ${isCompetenceValid ? 'button--active' : 'button--inactive-pending'} right-margin-btn`}
          onClick={saveCompetence}
          disabled={!isCompetenceValid}
        >
          Сохранить
        </button>
        
        {competences.length > 0 && (
          <button
            className='button button--red'
            onClick={deleteCompetence}
          >
            Удалить
          </button>
        )}
      </div>

      {competences.length > 0 && (
        <div className='add-competence'>
          <button
            className='add-competence_btn'
            onClick={prevCompetence}
            disabled={currentCompetenceIndex === 0}
          >
            <img className='add-competence_btn-img' src={arrow} alt="Назад" />
          </button>
          {currentCompetenceIndex + 1}/{competences.length}
          <button
            className='add-competence_btn'
            onClick={nextCompetence}
            disabled={currentCompetenceIndex === competences.length - 1}
          >
            <img className='add-competence_btn-img add-competence_btn-img-right' src={arrow} alt="Вперед" />
          </button>
        </div>
      )}
    </div>
  );
};

export default CompetenceForm;