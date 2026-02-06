import { useState, useEffect } from 'react';
import mockData from '../../../Mocks';
import eyeOpenIcon from '../../../assets/eye-open.svg';
import eyeClosedIcon from '../../../assets/eye-close.svg';

// Выносим компонент PasswordInput из функции рендеринга
interface PasswordInputProps {
  label: string;
  name: string;
  value: string;
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  name,
  value,
  showPassword,
  setShowPassword,
  onChange
}) => (
  <div className="personal-data-form_item password-input-wrapper">
    <label className="personal-data-form_item-label" htmlFor={name}>
      {label}
    </label>
    <div style={{ position: 'relative', width: '100%' }}>
      <input
        className="personal-data-form_item-input grey-input"
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        id={name}
        name={name}
        style={{ paddingRight: '40px' }}
      />
      <button
        type="button"
        className="password-toggle-button"
        onClick={() => setShowPassword(!showPassword)}
      >
        <img 
          src={showPassword ? eyeOpenIcon : eyeClosedIcon}  
          alt={showPassword ? 'Скрыть пароль' : 'Показать пароль'} 
        />
      </button>
    </div>
  </div>
);

const PasswordForm = () => {
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    repeatNewPassword: ''
  });

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const [statusMessage, setStatusMessage] = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (statusMessage) {
      const timer = setTimeout(() => {
        setStatusMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [statusMessage]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Очищаем статус при изменении полей
    if (statusMessage) {
      setStatusMessage('');
    }
  };

  const handlePasswordSubmit = async () => {
    // Проверка совпадения паролей
    if (passwordData.newPassword !== passwordData.repeatNewPassword) {
      setStatusMessage('Пароли не совпадают');
      setIsError(true);
      return;
    }

    // Проверка длины пароля
    if (passwordData.newPassword.length < 6) {
      setStatusMessage('Пароль должен содержать минимум 6 символов');
      setIsError(true);
      return;
    }

    // Проверка старого пароля
    if (passwordData.oldPassword !== mockData.User.password) {
      setStatusMessage('Неверный старый пароль');
      setIsError(true);
      return;
    }

    // Меняем пароль в моковых данных
    (mockData.User).password = passwordData.newPassword;
    
    // Показываем успешное сообщение
    setStatusMessage('Пароль успешно изменен');
    setIsError(false);
    
    // Через 2 секунды скрываем форму
    setTimeout(() => {
      setIsChangingPassword(false);
      setPasswordData({ oldPassword: '', newPassword: '', repeatNewPassword: '' });
      setStatusMessage('');
    }, 2000);
  };

  const isPasswordFormValid = 
    passwordData.oldPassword && 
    passwordData.newPassword && 
    passwordData.repeatNewPassword;

  return (
    <>
      {!isChangingPassword ? (
        <button
          className='button button--active'
          onClick={() => setIsChangingPassword(true)}
          style={{ marginTop: '20px' }}
        >
          Изменить пароль
        </button>
      ) : (
        <>
          <div className='personal-data-form change-password-form'>
            <PasswordInput
              label="Старый пароль"
              name="oldPassword"
              value={passwordData.oldPassword}
              showPassword={showOldPassword}
              setShowPassword={setShowOldPassword}
              onChange={handlePasswordChange}
            />
            
            <PasswordInput
              label="Новый пароль"
              name="newPassword"
              value={passwordData.newPassword}
              showPassword={showNewPassword}
              setShowPassword={setShowNewPassword}
              onChange={handlePasswordChange}
            />
            
            <PasswordInput
              label="Повторите пароль"
              name="repeatNewPassword"
              value={passwordData.repeatNewPassword}
              showPassword={showRepeatPassword}
              setShowPassword={setShowRepeatPassword}
              onChange={handlePasswordChange}
            />
          </div>
          <div className='password-save-div'>
            {statusMessage && (
              <p 
                style={{ color: isError ? '#B80205' : '#005529'}}
              >
                {statusMessage}
              </p>
            )}
            <button
              className={`button ${isPasswordFormValid ? 'button--active' : 'button--inactive-pending'}`}
              onClick={handlePasswordSubmit}
              disabled={!isPasswordFormValid}
            >
              Сохранить
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default PasswordForm;