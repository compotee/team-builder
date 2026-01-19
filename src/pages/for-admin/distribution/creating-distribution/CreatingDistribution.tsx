import { useState } from 'react';

import "./CreatingDistribution.css"


const CreatingDistribution = () => {
    const [membersCount, setMembersCount] = useState(5);

    const selects = Array.from({ length: membersCount }, (_, index) => (
        <select 
            key={index} 
            name={`member-${index}`}
            className="grey-select"
        >
            <option value="">Выберите роль</option>
            <option value="">Тимлид</option>
            <option value="">Аналитик</option>
            <option value="">Дизайнер</option>
            <option value="">Frontend-разработчик</option>
            <option value="">Backend-разработчик</option>
        </select>
    ));

    return (
        <form className='creating-distribution-container'>
            <p className='creating-distribution-container-title'>1. Заполните данные о распределении</p>
            <div className='creating-distribution-container_field'>
                <span className='creating-distribution-container_field-title'>Название группы</span>
                <input
                    className="creating-distribution-container_field-input grey-input"
                    // value={'Фамилия'}
                    id="lastName"
                    name="lastName"
                    placeholder='Введите название'
                />
            </div>
            <div className='creating-distribution-container_field'>
                <span className='creating-distribution-container_field-title'>Кол-во ролей в команде</span>
                <input 
                    className="creating-distribution-container_field-input grey-input" 
                    type="number" 
                    value={membersCount} 
                    onChange={(e) => setMembersCount(Number(e.target.value))}
                />
            </div>
            <p className='creating-distribution-container-title'>2.  Выберите роли, которые необходимы в проекте</p>
            { selects }
            <p className='creating-distribution-container-title'>3. Заполните данные о временных метриках распределения</p>
            <div className='creating-distribution-container_field'>
                <span className='creating-distribution-container_field-title'>Дата распределения</span>
                <input className="creating-distribution-container_field-input grey-input" type="date" />
            </div>
            <div className='creating-distribution-container_field'>
                <span className='creating-distribution-container_field-title'>Время распределения</span>
                <input className="creating-distribution-container_field-input grey-input" type="time" />
            </div>
            <div className='creating-distribution-container_field'>
                <span className='creating-distribution-container_field-title'>Дата окончания проектов</span>
                <input className="creating-distribution-container_field-input grey-input" type="date" />
            </div>
            <button className="button button--inactive-pending">Запустить распределение</button>
        </form>
    );
};

export default CreatingDistribution;