import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import "./Member.css"
import teamImg from '../../assets/main-page-img.svg'
import Team from '../../components/team/Team';
import { api, type Distribution, type Team as TeamType, type TeamMember as ApiTeamMember } from '../../api';

interface ConvertedTeamMember {
  id: number;
  role: string;
  name: string;
  telegram: string;
}

const MemberPage = () => {
  const [distributions, setDistributions] = useState<Distribution[]>([]);
  const [userTeam, setUserTeam] = useState<Record<number, TeamType>>({});
  const [error, setError] = useState<string | null>(null);
  
  const location = useLocation();
  const distributionId = location.state?.distributionId;

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      try {
        const response = await api.distributions.getAll();
        const userDistributions = response.distributions.filter((dist: Distribution) => !dist.is_admin);
        setDistributions(userDistributions);

        const userTeamData: Record<number, TeamType> = {};

        await Promise.all(
          userDistributions.map(async (dist: Distribution) => {
            if (dist.status !== 'active') {
              try {
                const myTeamResponse = await api.distributions.getMyTeam(dist.id);
                userTeamData[dist.id] = myTeamResponse;
              } catch (err: unknown) {
                console.error(`Не удалось загрузить команду для распределения ${dist.id}:`, err);
              }
            }
          })
        );

        setUserTeam(userTeamData);
      } catch (err: unknown) {
        setError('Не удалось загрузить распределения');
        console.error('Failed to load distributions:', err);
      } 
    };

    fetchData();
  }, []);

  let distributionsToShow = [...distributions];
  
  if (distributionId) {
    const selectedDistribution = distributions.find(dist => dist.id === distributionId);
    if (selectedDistribution) {
      distributionsToShow = distributionsToShow.filter(dist => dist.id !== distributionId);
      distributionsToShow.unshift(selectedDistribution);
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU');
  };

  const formatDateTime = (dateString: string, timeString: string) => {
    const date = new Date(dateString);
    const time = timeString || '00:00';
    return `${date.toLocaleDateString('ru-RU')} ${time}`;
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case 'active': return 'Ожидает распределения';
      case 'completed': return 'Распределение завершено';
      case 'end': return 'Проект завершен';
      default: return 'Статус неизвестен';
    }
  };

  const getTeamStatus = (distribution: Distribution) => {
    const currentUserTeam = userTeam[distribution.id];
    
    if (distribution.status === 'active') {
      return 'В стадии формирования';
    } else if (distribution.status === 'completed' || distribution.status === 'end') {
      if (currentUserTeam) {
        return 'Ваша команда сформирована';
      } else {
        return 'Вы не вошли в команду';
      }
    }
    return 'Статус неизвестен';
  };

  const convertToTeamComponentFormat = (team: TeamType): ConvertedTeamMember[] => {
    if (!team?.members) return [];
    
    return team.members.map((member: ApiTeamMember) => ({
      id: member.user_id || member.id,
      role: member.role,
      name: member.username,
      telegram: member.username
    }));
  };

  if (error) {
    return <div className="member-page-container">{error}</div>;
  }

  if (distributionsToShow.length === 0) {
    return (
      <div className="member-page-container">
        <div className="distribution-card">
          <div className='distribution-card_info'>
            <p className='distribution-card_info-status'>У вас нет распределений</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="member-page-container">
      {distributionsToShow.map((distribution, index) => {
        const currentUserTeam = userTeam[distribution.id];
        const showTeam = (distribution.status === 'completed' || distribution.status === 'end') && currentUserTeam;
        
        return (
          <div key={distribution.id} className="distribution-card" style={{ 
            marginTop: index > 0 ? '30px' : '0',
            border: distributionId && index === 0 ? '2px solid #007bff' : 'none'
          }}>
            <div className='distribution-card_info'>
              <p className='distribution-card_info-status'>{getStatusText(distribution.status)}</p>
              
              <div className='distribution-card_info-project'>
                <p className='distribution-card_info-project_title'>Название группы</p>
                <div className='distribution-card_info-project_text'>{distribution.name}</div>
              </div>
              
              <div className='distribution-card_info-project'>
                <span className='distribution-card_info-project_title'>Дата и время распределения</span>
                <div className='distribution-card_info-project_text'>
                  {formatDateTime(distribution.auto_finish_date, distribution.auto_finish_time)}
                </div>
              </div>
              
              <div className='distribution-card_info-project'>
                <span className='distribution-card_info-project_title'>Дата окончания проектов</span>
                <div className='distribution-card_info-project_text'>
                  {formatDate(distribution.team_expiry_date)}
                </div>
              </div>
              
              <h3 className='distribution-card_info-team-title'>Команда</h3>
              
              <span className='distribution-card_info-team-status'>
                {getTeamStatus(distribution)}
              </span>
              
              {showTeam && currentUserTeam && (
                <Team teamMembers={convertToTeamComponentFormat(currentUserTeam)} />
              )}
              
              {!showTeam && (
                <div className='distribution-card_info-competencies'>
                  {distribution.possible_roles.map((role: string, roleIndex: number) => (
                    <div key={roleIndex} className='distribution-card_info-competencies_item'>
                      {role}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <img className='distribution-card_img' src={teamImg} alt="" />
          </div>
        );
      })}
    </div>
  );
};

export default MemberPage;