import { useState, useEffect } from "react";
import Team from "../../../../components/team/Team";
import "./FormedTeams.css"
import questionIcon from '../../../../assets/question-icon.svg'
import { api, type Distribution, type Team as TeamType, type TeamMember } from '../../../../api';

interface ConvertedTeamMember {
    id: number;
    role: string;
    name: string;
    telegram: string;
}

interface FormedTeamsProps {
    distributionId: number;
}

const FormedTeams: React.FC<FormedTeamsProps> = ({ distributionId }) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const [distribution, setDistribution] = useState<Distribution | null>(null);
    const [teams, setTeams] = useState<TeamType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const [distributionResponse, teamsResponse] = await Promise.all([
                    api.distributions.getById(distributionId),
                    api.distributions.getTeams(distributionId)
                ]);
                setDistribution(distributionResponse);
                setTeams(teamsResponse.teams);
            } catch (err: unknown) {
                setError('Не удалось загрузить данные распределения');
                console.error('Failed to load distribution data:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [distributionId]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU');
    };

    const formatDateTime = (dateString: string, timeString: string) => {
        const date = new Date(dateString);
        return `${date.toLocaleDateString('ru-RU')} ${timeString}`;
    };

    const convertToTeamComponentFormat = (members: TeamMember[]): ConvertedTeamMember[] => {
        return members.map(member => ({
            id: member.user_id || member.id,
            role: member.role,
            name: member.username,
            telegram: member.username
        }));
    };

    if (isLoading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!distribution) {
        return <div>Распределение не найдено</div>;
    }

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
            
            {teams.length > 0 ? (
                <div className="formed-teams-container">
                    <h2 className="formed-teams-container-title">Сформированные команды</h2>
                    <div className="teams-container">
                        {teams.map((team, index) => (
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