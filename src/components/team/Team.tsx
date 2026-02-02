import './Team.css'

import copyIcon from '../../assets/copy-icon.svg'


interface TeamMember {
  id: number;
  role: string;
  name: string;
  telegram: string;
}

const Team = () => {
    const teamMembers: TeamMember[] = [
        { id: 1, role: 'Тимлид', name: 'Васильев Василий Васильевич', telegram: '@vassilV' },
        { id: 2, role: 'Тимлид', name: 'Васильев Василий Васильевич', telegram: '@vassilV' },
        { id: 3, role: 'Тимлид', name: 'Васильев Василий Васильевич', telegram: '@vassilV' },
        { id: 4, role: 'Тимлид', name: 'Иванов Иван Иванович', telegram: '@ivanov' },
        { id: 5, role: 'Frontend разработчик', name: 'Балыков Владислав Иванович', telegram: '@BalikBik' },
    ];

    const handleCopy = async (member: TeamMember) => {
        try {
            await navigator.clipboard.writeText(member.telegram);
        } catch (err) {
            console.error('Ошибка при копировании:', err);
        }
    };

    return (
        <div className='team-container'>
        {teamMembers.map((member) => (
            <div key={member.id} className='team-item'>
            <div className='team-item_role'>{member.role}</div>
            <p className='team-item_name'>{member.name}</p>
            <p className='team-item_tg'>{member.telegram}</p>
            <button 
                className='team-item_copy-btn'
                onClick={() => handleCopy(member)}
            >
                <img src={copyIcon} alt="Копировать"/>
            </button>
            </div>
        ))}
        </div>
    );
};

export default Team;
