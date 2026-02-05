import './Team.css'
import copyIcon from '../../assets/copy-icon.svg'

interface TeamMember {
  id: number;
  role: string;
  name: string;
  telegram: string;
}

interface TeamProps {
  teamMembers: TeamMember[];
}

const Team = ({ teamMembers }: TeamProps) => {
    const handleCopy = async (member: TeamMember) => {
        try {
            await navigator.clipboard.writeText(member.telegram);
            alert(`Никнейм ${member.telegram} скопирован в буфер обмена`);
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
                title="Скопировать телеграм"
            >
                <img src={copyIcon} alt="Копировать"/>
            </button>
            </div>
        ))}
        </div>
    );
};

export default Team;