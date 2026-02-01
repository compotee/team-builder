import { useState, useRef } from 'react';


import pencilIcon from "../../../assets/pencil-icon.svg";
import checkmarkIcon from "../../../assets/checkmark-icon.svg";

interface UserDataFormProps {
  userData: {
    lastName: string;
    firstName: string;
    middleName: string;
    login: string;
    password: string;
  };
  onUpdate: () => void;
}

const UserDataForm = ({ userData, onUpdate }: UserDataFormProps) => {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState('');
  
  const lastNameRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const middleNameRef = useRef<HTMLInputElement>(null);
  const loginRef = useRef<HTMLInputElement>(null);

  const startEditing = (fieldName: string, currentValue: string) => {
    setEditingField(fieldName);
    setTempValue(currentValue);
  };

  const saveField = async (fieldKey: string) => {
    try {
      const response = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          [fieldKey]: tempValue
        })
      });

      if (response.ok) {
        onUpdate();
      }
    } catch (error) {
      console.error('Ошибка сохранения:', error);
    } finally {
      setEditingField(null);
    }
  };
  
  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempValue(e.target.value);
  };

  const renderEditableField = (
    label: string,
    fieldName: string,
    fieldKey: string,
    value: string,
    ref: React.RefObject<HTMLInputElement | null>
  ) => {
    const isEditing = editingField === fieldName;

    return (
      <div className="personal-data-form_item" key={fieldName}>
        <label className="personal-data-form_item-label" htmlFor={fieldName}>
          {label}
        </label>
        <input
          ref={ref}
          className="personal-data-form_item-input grey-input"
          type="text"
          value={isEditing ? tempValue : value}
          onChange={handleFieldChange}
          id={fieldName}
          name={fieldName}
          readOnly={!isEditing}
          disabled={!isEditing}
        />
        <button
          type="button"
          onClick={() => {
            if (isEditing) {
              saveField(fieldKey);
            } else {
              startEditing(fieldName, value);
            }
          }}
        >
          <img
            className='personal-data-form_item-img'
            src={isEditing ? checkmarkIcon : pencilIcon}
            alt={isEditing ? "Сохранить" : "Редактировать"}
          />
        </button>
      </div>
    );
  };

  return (
    <div className="personal-data-form">
      {renderEditableField('Фамилия', 'lastName', 'last_name', userData.lastName, lastNameRef)}
      {renderEditableField('Имя', 'firstName', 'first_name', userData.firstName, firstNameRef)}
      {renderEditableField('Отчество', 'middleName', 'middle_name', userData.middleName, middleNameRef)}
      {renderEditableField('Логин в ТГ', 'login', 'tg_link', userData.login, loginRef)}
      
      <div className="personal-data-form_item">
        <label className="personal-data-form_item-label" htmlFor="password">
          Пароль
        </label>
        <input
          className="personal-data-form_item-input grey-input"
          type="text"
          value={userData.password}
          readOnly
          id="password"
          name="password"
        />
        <button className='hidden-button'>
          <img className='personal-data-form_item-img' src={pencilIcon} alt="" />
        </button>
      </div>
    </div>
  );
};

export default UserDataForm;