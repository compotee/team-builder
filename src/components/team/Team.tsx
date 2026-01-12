import './Team.css'

import copyIcon from '../../assets/copy-icon.svg'


const Team = () => {
  return (
    <div className='team-container'>
        {/* вывод данных из базы */}
        <div className='team-item'>
            <div className='team-item_role'>Тимлид</div>
            <p className='team-item_name'>Васильев Василий Васильевич</p>
            <p className='team-item_tg'>@vassilV</p>
            {/* замена иконки на галочку, если скопировано ??? */}
            {/* функционал копирования текста */}
            <button className='team-item_copy-btn'>
                <img src={copyIcon} alt="" />
            </button>
        </div>
        <div className='team-item'>
            <div className='team-item_role'>Тимлид</div>
            <p className='team-item_name'>Васильев Василий Васильевич</p>
            <p className='team-item_tg'>@vassilV</p>
            <button className='team-item_copy-btn'>
                <img src={copyIcon} alt="" />
            </button>
        </div>
        <div className='team-item'>
            <div className='team-item_role'>Тимлид</div>
            <p className='team-item_name'>Васильев Василий Васильевич</p>
            <p className='team-item_tg'>@vassilV</p>
            <button className='team-item_copy-btn'>
                <img src={copyIcon} alt="" />
            </button>
        </div>
        <div className='team-item'>
            <div className='team-item_role'>Тимлид</div>
            <p className='team-item_name'>Васильев Василий Васильевич</p>
            <p className='team-item_tg'>@vassilV</p>
            <button className='team-item_copy-btn'>
                <img src={copyIcon} alt="" />
            </button>
        </div>
        <div className='team-item'>
            <div className='team-item_role'>Frontend разработчик</div>
            <p className='team-item_name'>Балыков Владислав Иванович</p>
            <p className='team-item_tg'>@BalikBik</p>
            <button className='team-item_copy-btn'>
                <img src={copyIcon} alt="" />
            </button>
        </div>
    </div>
  );
};

export default Team;
