import { useState, useEffect } from 'react';
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
  const [currentCompetence, setCurrentCompetence] = useState<Competence>({ 
    id: 0, 
    role: '', 
    stack: '', 
    experience: '' 
  });
  const [originalCompetence, setOriginalCompetence] = useState<Competence | null>(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [isAddingNew, setIsAddingNew] = useState(false);

  // Обновляем currentCompetence при изменении competences или currentCompetenceIndex
  useEffect(() => {
    const updateState = () => {
      if (competences.length > 0) {
        if (currentCompetenceIndex < competences.length) {
          const competence = competences[currentCompetenceIndex];
          setCurrentCompetence(competence);
          setOriginalCompetence(competence);
          setIsAddingNew(false);
        } else {
          // Добавляем новую компетенцию
          setCurrentCompetence({ 
            id: Math.floor(Math.random() * 10000), 
            role: '', 
            stack: '', 
            experience: '' 
          });
          setOriginalCompetence(null);
          setIsAddingNew(true);
        }
      } else {
        // Нет компетенций - создаем первую
        setCurrentCompetence({ 
          id: Math.floor(Math.random() * 10000), 
          role: '', 
          stack: '', 
          experience: '' 
        });
        setOriginalCompetence(null);
        setIsAddingNew(true);
      }
    };

    // Обернем в setTimeout для избежания синхронного вызова setState
    const timer = setTimeout(updateState, 0);
    return () => clearTimeout(timer);
  }, [competences, currentCompetenceIndex]);

  // Таймер для статусного сообщения
  useEffect(() => {
    if (statusMessage) {
      const timer = setTimeout(() => {
        setStatusMessage('');
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [statusMessage]);

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setCurrentCompetence(prev => ({
      ...prev,
      role: value
    }));
  };

  const handleStackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCurrentCompetence(prev => ({
      ...prev,
      stack: value
    }));
  };

  const handleExperienceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setCurrentCompetence(prev => ({
      ...prev,
      experience: value
    }));
  };

  const saveCompetence = () => {
    // Проверяем, что все поля заполнены
    if (!currentCompetence.role || !currentCompetence.stack || !currentCompetence.experience) {
      return;
    }

    let updatedCompetences: Competence[];
    
    if (isAddingNew) {
      // Добавляем новую компетенцию
      updatedCompetences = [...competences, currentCompetence];
    } else {
      // Обновляем существующую компетенцию
      updatedCompetences = [...competences];
      updatedCompetences[currentCompetenceIndex] = currentCompetence;
    }

    // Обновляем моковые данные
    mockData.User.competence = updatedCompetences;
    mockData.Competence = updatedCompetences;

    // Показываем статусное сообщение
    setStatusMessage(isAddingNew ? 'Компетенция добавлена!' : 'Компетенция сохранена!');

    // Если добавляли новую, переходим на нее
    if (isAddingNew) {
      setTimeout(() => {
        setCurrentCompetenceIndex(updatedCompetences.length - 1);
      }, 0);
    }

    // Обновляем родительский компонент
    setTimeout(() => {
      onUpdate();
    }, 0);
  };

  const deleteCompetence = () => {
    if (competences.length === 0 || isAddingNew) return;

    const updatedCompetences = competences.filter((_, index) => index !== currentCompetenceIndex);
    
    // Обновляем моковые данные
    mockData.User.competence = updatedCompetences;
    mockData.Competence = updatedCompetences;
    
    // Переходим на предыдущую компетенцию
    const newIndex = Math.max(0, currentCompetenceIndex - 1);
    setTimeout(() => {
      setCurrentCompetenceIndex(newIndex);
    }, 0);
    
    // Обновляем родительский компонент
    setTimeout(() => {
      onUpdate();
    }, 0);
  };

  const nextCompetence = () => {
    setTimeout(() => {
      setCurrentCompetenceIndex(prev => prev + 1);
    }, 0);
  };

  const prevCompetence = () => {
    if (currentCompetenceIndex > 0) {
      setTimeout(() => {
        setCurrentCompetenceIndex(prev => prev - 1);
      }, 0);
    }
  };

  const isCompetenceValid = 
    currentCompetence.role && 
    currentCompetence.stack && 
    currentCompetence.experience;

  const hasChanges = !originalCompetence || 
    currentCompetence.role !== originalCompetence.role ||
    currentCompetence.stack !== originalCompetence.stack ||
    currentCompetence.experience !== originalCompetence.experience;

  const isSaveEnabled = isCompetenceValid && (isAddingNew || hasChanges);

  const totalCount = isAddingNew ? competences.length + 1 : competences.length;

  return (
    <div className='competencies-form'>
      <h3 className='competencies-form_titile'>Ваши компетенции</h3>
      
      <select
        name="role"
        className='competencies-form_item competencies-form_select'
        value={currentCompetence.role}
        onChange={handleRoleChange}
      >
        <option value="">Роль</option>
        {mockData.Role.map((role, index) => (
          <option key={index} value={role}>{role}</option>
        ))}
      </select>

      <div className="competencies-form_item">
        <input
          className="competencies-form_input"
          value={currentCompetence.stack}
          onChange={handleStackChange}
          placeholder='Стэк (через запятую)'
        />
      </div>

      <select
        name="experience"
        className='competencies-form_item competencies-form_select'
        value={currentCompetence.experience}
        onChange={handleExperienceChange}
      >
        <option value="">Опыт</option>
        {mockData.Experience.map((exp, index) => (
          <option key={index} value={exp}>{exp}</option>
        ))}
      </select>

      {statusMessage && (
        <p 
          style={{ color: '#004F10' }}
        >
          {statusMessage}
        </p>
      )}

      <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
        <button
          className={`button ${isSaveEnabled ? 'button--active' : 'button--inactive-pending'}`}
          onClick={saveCompetence}
          disabled={!isSaveEnabled}
          style={{ marginRight: '10px' }}
        >
          {isAddingNew ? 'Добавить' : 'Сохранить'}
        </button>
        
        <button
          className={`button button--red ${isAddingNew ? 'button--inactive-pending' : ''}`}
          onClick={deleteCompetence}
          disabled={isAddingNew}
        >
          Удалить
        </button>
      </div>

      {/* Навигация по компетенциям */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', marginTop: '20px' }}>
        <button
          className='add-competence_btn'
          onClick={prevCompetence}
          disabled={currentCompetenceIndex === 0}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0', width: '24px', height: '24px' }}
        >
          <img 
            className='add-competence_btn-img' 
            src={arrow} 
            alt="Назад" 
            style={{ width: '100%', height: '100%' }}
          />
        </button>
        {currentCompetenceIndex + 1}/{totalCount}
        <button
          className='add-competence_btn'
          onClick={nextCompetence}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0', width: '24px', height: '24px' }}
        >
          <img 
            className='add-competence_btn-img add-competence_btn-img-right' 
            src={arrow} 
            alt="Вперед" 
            style={{ width: '100%', height: '100%', transform: 'rotate(180deg)' }}
          />
        </button>
      </div>
    </div>
  );
};

export default CompetenceForm;