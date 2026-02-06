import { useState, useEffect } from 'react';
import { api, type UpdatePasswordData } from '../../../api';
import eyeOpenIcon from '../../../assets/eye-open.svg';
import eyeClosedIcon from '../../../assets/eye-close.svg';

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
  const [isLoading, setIsLoading] = useState(false);

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
    
    if (statusMessage) {
      setStatusMessage('');
    }
  };

  const handlePasswordSubmit = async () => {
    if (passwordData.newPassword !== passwordData.repeatNewPassword) {
      setStatusMessage('Пароли не совпадают');
      setIsError(true);
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setStatusMessage('Пароль должен содержать минимум 6 символов');
      setIsError(true);
      return;
    }

    setIsLoading(true);
    try {
      const updateData: UpdatePasswordData = {
        currentPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword,
        confirmPassword: passwordData.repeatNewPassword
      };

      const response = await api.user.updatePassword(updateData);
      
      if (response.success) {
        setStatusMessage('Пароль успешно изменен');
        setIsError(false);
        
        setTimeout(() => {
          setIsChangingPassword(false);
          setPasswordData({ oldPassword: '', newPassword: '', repeatNewPassword: '' });
          setStatusMessage('');
        }, 2000);
      } else {
        setStatusMessage(response.message || 'Ошибка при изменении пароля');
        setIsError(true);
      }
    } catch (err: unknown) {
      setStatusMessage(err instanceof Error ? err.message : 'Ошибка при изменении пароля');
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
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
              <p style={{ color: isError ? '#B80205' : '#005529'}}>
                {statusMessage}
              </p>
            )}
            <button
              className={`button ${isPasswordFormValid ? 'button--active' : 'button--inactive-pending'}`}
              onClick={handlePasswordSubmit}
              disabled={!isPasswordFormValid || isLoading}
            >
              {isLoading ? 'Сохранение...' : 'Сохранить'}
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default PasswordForm;