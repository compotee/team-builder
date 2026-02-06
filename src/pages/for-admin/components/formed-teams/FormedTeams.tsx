import { useState } from "react";
import Team from "../../../../components/team/Team";
import "./FormedTeams.css"

import questionIcon from '../../../../assets/question-icon.svg'

interface TeamMember {
    id: number;
    firstName: string;
    middleName: string;
    lastName: string;
    role: string;
    tg_link: string;
}

interface Distribution {
    id: number;
    name: string;
    auto_finish_date: string;
    auto_finish_time: string;
    team_expiry_date: string;
    teams?: {
        id: number;
        members: TeamMember[];
    }[];
}

interface FormedTeamsProps {
    distribution: Distribution;
}

const FormedTeams: React.FC<FormedTeamsProps> = ({ distribution }) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU');
    };

    const formatDateTime = (dateString: string, timeString: string) => {
        const date = new Date(dateString);
        return `${date.toLocaleDateString('ru-RU')} ${timeString}`;
    };

    // Конвертируем TeamMember в формат для компонента Team
    const convertToTeamComponentFormat = (members: TeamMember[]) => {
        return members.map(member => ({
            id: member.id,
            role: member.role,
            name: `${member.lastName} ${member.firstName} ${member.middleName}`,
            telegram: member.tg_link
        }));
    };

    return (
        <>
            <div className="information-container">
                <h2 className="information-container-title">Информация о распределении</h2>
                <div className="information-container-item">
                    <span className="information-container-item-span">Название группы</span>
                    <div className="information-container-item-div">{distribution.name}</div>
                </div>
                <div className="information-container-items">
                    <div className="information-container-item">
                        <span className="information-container-item-span">Дата и время распределения</span>
                        <div className="information-container-item-div">
                            {formatDateTime(distribution.auto_finish_date, distribution.auto_finish_time)}
                        </div>
                    </div>
                    <div className="information-container-item">
                        <span className="information-container-item-span">Дата окончания проектов</span>
                        <div 
                            className="tooltip-container"
                            onMouseEnter={() => setShowTooltip(true)}
                            onMouseLeave={() => setShowTooltip(false)}
                            onClick={() => setShowTooltip(!showTooltip)}
                        >
                            <img 
                                src={questionIcon} 
                                alt="Подсказка" 
                                className="question-icon"
                            />
                                {showTooltip && (
                                <div className="tooltip-content">
                                    По наступлению даты окончания проектов распределение переходит из текущих в прошедшие
                                </div>
                            )}
                        </div>
                        <div className="information-container-item-div">
                            {formatDate(distribution.team_expiry_date)}
                        </div>
                    </div>
                </div>
            </div>
            
            {distribution.teams && distribution.teams.length > 0 ? (
                <div className="formed-teams-container">
                    <h2 className="formed-teams-container-title">Сформированные команды</h2>
                    <div className="teams-container">
                        {distribution.teams.map((team, index) => (
                            <div key={team.id} className="teams-container-item">
                                <p className="teams-container-item-title">
                                    {`Команда ${index + 1}`}
                                </p>
                                <Team teamMembers={convertToTeamComponentFormat(team.members)} />
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="no-teams-message">
                    Команды не были сформированы
                </div>
            )}
        </>
    );
};

export default FormedTeams;