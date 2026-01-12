import { useState } from 'react';
// import Team from '../../components/team/Team';

import "./Member.css"

import teamImg from '../../assets/main-page-img.svg'


const MemberPage = () => {
    const [isJoin, setIsJoin] = useState(false);

    return (
        <div className="member-page-container">
            <div className="distribution-card">
                <div className='distribution-card_info'>
                    {/* if по статусу */}
                    <p className='distribution-card_info-status'>Ожидает распределения</p>
                    <div className='distribution-card_info-project'>
                        <p className='distribution-card_info-project_title'>Название группы</p>
                        <div className='distribution-card_info-project_text'>Разработка сайта</div>
                    </div>
                    <div className='distribution-card_info-project'>
                        <span className='distribution-card_info-project_title'>Дата и время распределения</span>
                        <div className='distribution-card_info-project_text'>25.01.2026 11:00</div>
                    </div>
                    <div className='distribution-card_info-project'>
                        <span className='distribution-card_info-project_title'>Дата окончания проектов</span>
                        {/* знач`к с вопросом и подсказкой */}
                        <div className='distribution-card_info-project_text'>25.07.2026</div>
                    </div>
                    { isJoin ?
                        <b className='join-status'>Вы учавствуете в распределении</b>
                        :
                        <>
                            <div className='btns-div'>
                                <button 
                                    className='button button--active'
                                    onClick={() => setIsJoin(true)}
                                >
                                    Присоединиться к распределению
                                </button>
                                <button 
                                    className='button button--red'
                                >
                                    Не участвовать
                                </button>
                            </div>
                            {/* добавить if если нет компетенций */}
                            <span className='not-join-status'>
                                У вас нет подходящих компетенциий, заполните в <a className='not-join-status_link' href="/account"> личном кабинете</a>
                            </span>
                        </>
                    }
                    <h3 className='distribution-card_info-team-title'>Команда</h3>
                    {/* добавить if если команда сформирована
                    <Team /> */}
                    <span className='distribution-card_info-team-status'>В стадии формирования</span>
                    <div className='distribution-card_info-competencies'>
                        {/* сделать роли перечислением */}
                        <div className='distribution-card_info-competencies_item'>Тимлид</div>
                        <div className='distribution-card_info-competencies_item'>Дизайнер</div>
                        <div className='distribution-card_info-competencies_item'>Аналитик</div>
                        <div className='distribution-card_info-competencies_item'>Backend-разработчик</div>
                        <div className='distribution-card_info-competencies_item'>Frontend-разработчик</div>
                    </div>
                </div>
                <img className='distribution-card_img' src={teamImg} alt="" />
            </div>
        </div>
    );
};

export default MemberPage;