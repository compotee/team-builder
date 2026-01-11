import { useState } from 'react';

import './Account.css';

import pencilIcon from "../../assets/pencil-icon.svg"
// Замена картинки при редактировании
// import checkmarkIconIcon from "../../assets/checkmark-icon.svg"
import arrow from "../../assets/arrow.svg"
import backgroundImage from "../../assets/account-page-img.svg"

const AccountPage = () => {
    const [isChangingPassword, setIsisChangingPassword] = useState(false);

    return (
        <div className='account-page-container'>
            <div className='personal-data-container'>
                <form action={''} className="personal-data-form">
                    <div className="personal-data-form_item">
                        <label className="personal-data-form_item-label" htmlFor="lastName">Фамилия</label>
                        <input
                            className="personal-data-form_item-input grey-input"
                            value={'Фамилия'}
                            id="lastName"
                            name="lastName"
                        />
                        <button>
                            <img 
                                className='personal-data-form_item-img' 
                                src={pencilIcon} alt=""
                            />
                        </button>
                    </div>
                    <div className="personal-data-form_item">
                        <label className="personal-data-form_item-label" htmlFor="name">Имя</label>
                        <input
                            className="personal-data-form_item-input grey-input"
                            value={'Имя'}
                            id="name"
                            name="name"
                        />
                        <button>
                            <img 
                                className='personal-data-form_item-img' 
                                src={pencilIcon} alt="" 
                            />
                        </button>
                    </div>
                    <div className="personal-data-form_item">
                        <label className="personal-data-form_item-label" htmlFor="patronymic">Отчество</label>
                        <input
                            className="personal-data-form_item-input grey-input"
                            value={'Отчество'}
                            id="patronymic"
                            name="patronymic"
                        />
                        <button>
                            <img 
                                className='personal-data-form_item-img' 
                                src={pencilIcon} alt="" 
                            />
                        </button>
                    </div>
                    <div className="personal-data-form_item">
                        <label className="personal-data-form_item-label" htmlFor="login">Логин в ТГ</label>
                        <input
                            className="personal-data-form_item-input grey-input"
                            value={'@login'}
                            id="login"
                            name="login"
                        />
                        <button>
                            <img 
                                className='personal-data-form_item-img' 
                                src={pencilIcon} alt="" 
                            />
                        </button>
                    </div>
                    <div className="personal-data-form_item">
                        <label className="personal-data-form_item-label" htmlFor="password">Пароль</label>
                        <input
                            className="personal-data-form_item-input grey-input"
                            value={'****'}
                            id="password"
                            name="password"
                        />
                        <button className='hidden-button'>
                            <img 
                                className='personal-data-form_item-img ' 
                                src={pencilIcon} alt="" 
                            />
                        </button>
                    </div>
                </form>
                { isChangingPassword && 
                    <form className='personal-data-form change-password-form'>
                        <div className="personal-data-form_item">
                            <label className="personal-data-form_item-label" htmlFor="oldPassword">Старый пароль</label>
                            <input
                                className="personal-data-form_item-input grey-input"
                                value={''}
                                id="oldPassword"
                                name="oldPassword"
                            />
                        </div>
                        <div className="personal-data-form_item">
                            <label className="personal-data-form_item-label" htmlFor="newPassword">Новый пароль</label>
                            <input
                                className="personal-data-form_item-input grey-input"
                                value={''}
                                id="newPassword"
                                name="newPassword"
                            />
                        </div>
                        <div className="personal-data-form_item">
                            <label className="personal-data-form_item-label" htmlFor="repeatNewPassword">Повторите пароль</label>
                            <input
                                className="personal-data-form_item-input grey-input"
                                value={''}
                                id="repeatNewPassword"
                                name="repeatNewPassword"
                            />
                        </div>
                    </form>
                }
                { !isChangingPassword ?
                    <button 
                        className='button button--active'
                        onClick={() => setIsisChangingPassword(true)}
                    >
                        Изменить пароль
                    </button> 
                    :
                    <button 
                        // if в класс если данные в форме замены пароля не заполненны
                        className='button button--inactive-pending'
                        onClick={() => setIsisChangingPassword(false)}
                    >
                        Сохранить
                    </button>
                }
                <div>
                    <button
                        className='button button--red right-margin-btn'
                    >
                        Удалить профиль
                    </button>
                    <button
                        className='button button--red'
                    >
                        Выйти из аккаунта
                    </button>
                </div>
            </div>
            <form action={''} className='competencies-form'>
                <h3 className='competencies-form_titile'>Ваши компетенции</h3>
                {/* Сделать внешний вид всех полей для ввода и логику их работы  */}
                <select name="" id="" className='competencies-form_item'>
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                </select>
                <div className="competencies-form_item">
                        <input
                            className="personal-data-form_item-input grey-input"
                            value={''}
                            id="repeatNewPassword"
                            name="repeatNewPassword"
                            placeholder='Стэк'
                        />
                        <button>
                            <img 
                                className='personal-data-form_item-img' 
                                src={pencilIcon} alt=""
                            />
                        </button>
                </div>
                <select name="" id="" className='competencies-form_item'>
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                </select>
                {/* Логика работы выведения этих сообщений
                <span className='green-notification'>Компетенция сохранена</span>
                <span className='red-notification'>Вы уверены, что хотите удалить компетенцию?</span> */}
                <div>
                    <button
                        // if в класс если данные в форме замены пароля не заполненны
                        className='button button--inactive-pending right-margin-btn'
                    >
                        Сохранить
                    </button>
                    {/* выводить кнопку только если компетенция сохранена */}
                    <button
                        className='button button--red'
                    >
                        Удалить
                    </button>
                </div>
                {/* Логика работы переключения */}
                <div className='add-competence'>
                    <button className='add-competence_btn'>
                        <img className='add-competence_btn-img' src={arrow} alt="" />
                    </button>
                    1/1
                    <button className='add-competence_btn'>
                        <img className='add-competence_btn-img' src={arrow} alt="" />
                    </button>
                </div>
            </form>
            <div className='background-image'>
                <img src={backgroundImage} alt="" />
            </div>
        </div>
    );
};

export default AccountPage;