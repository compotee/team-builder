import { useState, useEffect } from 'react';
import arrow from "../../../assets/arrow.svg";
import { api, type CreateFormData, type UpdateFormData, type FormRole, type Experience } from '../../../api';

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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const updateState = () => {
      if (competences.length > 0) {
        if (currentCompetenceIndex < competences.length) {
          const competence = competences[currentCompetenceIndex];
          setCurrentCompetence(competence);
          setOriginalCompetence(competence);
          setIsAddingNew(false);
        } else {
          setCurrentCompetence({ 
            id: 0, 
            role: '', 
            stack: '', 
            experience: '' 
          });
          setOriginalCompetence(null);
          setIsAddingNew(true);
        }
      } else {
        setCurrentCompetence({ 
          id: 0, 
          role: '', 
          stack: '', 
          experience: '' 
        });
        setOriginalCompetence(null);
        setIsAddingNew(true);
      }
    };

    const timer = setTimeout(updateState, 0);
    return () => clearTimeout(timer);
  }, [competences, currentCompetenceIndex]);

  useEffect(() => {
    if (statusMessage) {
      const timer = setTimeout(() => {
        setStatusMessage('');
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [statusMessage]);

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as FormRole;
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
    const value = e.target.value as Experience;
    setCurrentCompetence(prev => ({
      ...prev,
      experience: value
    }));
  };

  const saveCompetence = async () => {
    if (!currentCompetence.role || !currentCompetence.stack || !currentCompetence.experience) {
      return;
    }

    setIsLoading(true);
    try {
      const skillsArray = currentCompetence.stack.split(',').map(skill => skill.trim());
      
      if (isAddingNew) {
        const createData: CreateFormData = {
          role: currentCompetence.role as FormRole,
          experience: currentCompetence.experience as Experience,
          skills: skillsArray
        };
        await api.forms.create(createData);
        setStatusMessage('Компетенция добавлена!');
      } else {
        const updateData: UpdateFormData = {
          role: currentCompetence.role as FormRole,
          experience: currentCompetence.experience as Experience,
          skills: skillsArray
        };
        await api.forms.update(currentCompetence.id, updateData);
        setStatusMessage('Компетенция сохранена!');
      }

      if (isAddingNew) {
        setTimeout(() => {
          setCurrentCompetenceIndex(competences.length);
        }, 0);
      }

      setTimeout(() => {
        onUpdate();
      }, 0);
    } catch (error) {
      console.error('Failed to save competence:', error);
      setStatusMessage('Ошибка при сохранении');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteCompetence = async () => {
    if (competences.length === 0 || isAddingNew || !currentCompetence.id) return;

    setIsLoading(true);
    try {
      await api.forms.delete(currentCompetence.id);
      
      const newIndex = Math.max(0, currentCompetenceIndex - 1);
      setTimeout(() => {
        setCurrentCompetenceIndex(newIndex);
      }, 0);
      
      setTimeout(() => {
        onUpdate();
      }, 0);
    } catch (error) {
      console.error('Failed to delete competence:', error);
    } finally {
      setIsLoading(false);
    }
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

  const roleOptions: FormRole[] = ['Тимлид', 'Аналитик', 'Дизайнер', 'Frontend-разработчик', 'Backend-разработчик'];
  const experienceOptions: Experience[] = [
    'Нет практического опыта',
    'До полугода', 
    'От полугода до года',
    'Более одного года менее трёх лет',
    'Более трёх лет'
  ];

  return (
    <div className='competencies-form'>
      <h3 className='competencies-form_titile'>Ваши компетенции</h3>
      
      <select
        name="role"
        className='competencies-form_item competencies-form_select'
        value={currentCompetence.role}
        onChange={handleRoleChange}
        disabled={isLoading}
      >
        <option value="">Роль</option>
        {roleOptions.map((role, index) => (
          <option key={index} value={role}>{role}</option>
        ))}
      </select>

      <div className="competencies-form_item">
        <input
          className="competencies-form_input"
          value={currentCompetence.stack}
          onChange={handleStackChange}
          placeholder='Стэк (через запятую)'
          disabled={isLoading}
        />
      </div>

      <select
        name="experience"
        className='competencies-form_item competencies-form_select'
        value={currentCompetence.experience}
        onChange={handleExperienceChange}
        disabled={isLoading}
      >
        <option value="">Опыт</option>
        {experienceOptions.map((exp, index) => (
          <option key={index} value={exp}>{exp}</option>
        ))}
      </select>

      {statusMessage && (
        <p style={{ color: '#004F10' }}>{statusMessage}</p>
      )}

      <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
        <button
          className={`button ${isSaveEnabled ? 'button--active' : 'button--inactive-pending'}`}
          onClick={saveCompetence}
          disabled={!isSaveEnabled || isLoading}
          style={{ marginRight: '10px' }}
        >
          {isLoading ? 'Сохранение...' : (isAddingNew ? 'Добавить' : 'Сохранить')}
        </button>
        
        <button
          className={`button button--red ${isAddingNew ? 'button--inactive-pending' : ''}`}
          onClick={deleteCompetence}
          disabled={isAddingNew || isLoading}
        >
          Удалить
        </button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', marginTop: '20px' }}>
        <button
          className='add-competence_btn'
          onClick={prevCompetence}
          disabled={currentCompetenceIndex === 0 || isLoading}
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
          disabled={isLoading}
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