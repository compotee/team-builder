import { useState, useEffect } from 'react';
import './Team.css'
import copyIcon from '../../assets/copy-icon.svg'
import checkIcon from '../../assets/checkmark-icon.svg'

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
    const [copiedMemberId, setCopiedMemberId] = useState<number | null>(null);

    useEffect(() => {
        if (copiedMemberId !== null) {
            const timer = setTimeout(() => {
                setCopiedMemberId(null);
            }, 1000);
            
            return () => clearTimeout(timer);
        }
    }, [copiedMemberId]);

    const handleCopy = async (member: TeamMember) => {
        try {
            await navigator.clipboard.writeText(member.telegram);
            setCopiedMemberId(member.id);
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
            <p className='team-item_tg'>@{member.telegram}</p>
            <button 
                className='team-item_copy-btn'
                onClick={() => handleCopy(member)}
                title={copiedMemberId === member.id ? "Скопировано!" : "Скопировать телеграм"}
            >
                <img 
                    src={copiedMemberId === member.id ? checkIcon : copyIcon} 
                    alt={copiedMemberId === member.id ? "Скопировано" : "Копировать"}
                />
            </button>
            </div>
        ))}
        </div>
    );
};

export default Team;