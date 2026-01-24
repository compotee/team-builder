import { useState } from 'react';


import pencilIcon from "../../../assets/pencil-icon.svg";
import arrow from "../../../assets/arrow.svg";

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

  // При изменении списка компетенций или индекса обновляем текущую
  useState(() => {
    if (competences.length > 0 && currentCompetenceIndex < competences.length) {
      setCurrentCompetence(competences[currentCompetenceIndex]);
    } else {
      setCurrentCompetence({ id: 0, role: '', stack: '', experience: '' });
    }
  });

  const handleCompetenceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: keyof Competence) => {
    const { value } = e.target;
    setCurrentCompetence(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const saveCompetence = async () => {
    try {
      const response = await fetch('/api/user/competences', {
        method: competences.length > 0 ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(currentCompetence)
      });

      if (response.ok) {
        onUpdate();
        alert('Компетенция сохранена');
      }
    } catch (error) {
      console.error('Ошибка сохранения компетенции:', error);
    }
  };

  const deleteCompetence = async () => {
    if (competences.length === 0) return;

    if (!window.confirm('Вы уверены, что хотите удалить компетенцию?')) {
      return;
    }

    try {
      const response = await fetch(`/api/user/competences/${currentCompetence.id}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (response.ok) {
        onUpdate();
      }
    } catch (error) {
      console.error('Ошибка удаления компетенции:', error);
    }
  };

  const nextCompetence = () => {
    if (currentCompetenceIndex < competences.length - 1) {
      const nextIndex = currentCompetenceIndex + 1;
      setCurrentCompetenceIndex(nextIndex);
      setCurrentCompetence(competences[nextIndex]);
    }
  };

  const prevCompetence = () => {
    if (currentCompetenceIndex > 0) {
      const prevIndex = currentCompetenceIndex - 1;
      setCurrentCompetenceIndex(prevIndex);
      setCurrentCompetence(competences[prevIndex]);
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
        <option value="Тимлид">Тимлид</option>
        <option value="Аналитик">Аналитик</option>
        <option value="Дизайнер">Дизайнер</option>
        <option value="Frontend-разработчик">Frontend-разработчик</option>
        <option value="Backend-разработчик">Backend-разработчик</option>
      </select>

      <div className="competencies-form_item">
        <input
          className="competencies-form_input"
          value={currentCompetence.stack}
          onChange={(e) => handleCompetenceChange(e, 'stack')}
          placeholder='Стэк'
        />
        <button>
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
        <option value="Меньше года">Меньше года</option>
        <option value="1-3 года">1-3 года</option>
        <option value="3-5 лет">3-5 лет</option>
        <option value="Более 5 лет">Более 5 лет</option>
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