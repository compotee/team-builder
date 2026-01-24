import { useState } from 'react';

const PasswordForm = () => {
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    repeatNewPassword: ''
  });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordSubmit = async () => {
    if (passwordData.newPassword !== passwordData.repeatNewPassword) {
      alert('Пароли не совпадают');
      return;
    }

    try {
      const response = await fetch('/api/user/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          oldPassword: passwordData.oldPassword,
          newPassword: passwordData.newPassword
        })
      });

      if (response.ok) {
        alert('Пароль успешно изменен');
        setIsChangingPassword(false);
        setPasswordData({ oldPassword: '', newPassword: '', repeatNewPassword: '' });
      } else {
        const error = await response.json();
        throw new Error(error.message || 'Ошибка смены пароля');
      }
    } catch (error) {
      console.error('Ошибка сохранения:', error);
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
            <div className="personal-data-form_item">
              <label className="personal-data-form_item-label" htmlFor="oldPassword">
                Старый пароль
              </label>
              <input
                className="personal-data-form_item-input grey-input"
                type="password"
                value={passwordData.oldPassword}
                onChange={handlePasswordChange}
                id="oldPassword"
                name="oldPassword"
              />
            </div>
            <div className="personal-data-form_item">
              <label className="personal-data-form_item-label" htmlFor="newPassword">
                Новый пароль
              </label>
              <input
                className="personal-data-form_item-input grey-input"
                type="password"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                id="newPassword"
                name="newPassword"
              />
            </div>
            <div className="personal-data-form_item">
              <label className="personal-data-form_item-label" htmlFor="repeatNewPassword">
                Повторите пароль
              </label>
              <input
                className="personal-data-form_item-input grey-input"
                type="password"
                value={passwordData.repeatNewPassword}
                onChange={handlePasswordChange}
                id="repeatNewPassword"
                name="repeatNewPassword"
              />
            </div>
          </div>
          
          <button
            className={`button ${isPasswordFormValid ? 'button--active' : 'button--inactive-pending'}`}
            onClick={handlePasswordSubmit}
            disabled={!isPasswordFormValid}
            style={{ marginTop: '20px' }}
          >
            Сохранить
          </button>
        </>
      )}
    </>
  );
};

export default PasswordForm;