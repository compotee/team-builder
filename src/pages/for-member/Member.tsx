import { useLocation } from 'react-router-dom';
import "./Member.css"
import teamImg from '../../assets/main-page-img.svg'
import Team from '../../components/team/Team';
import mockData from '../../Mocks';

interface Distribution {
  id: number;
  name: string;
  max_members_team: number;
  possible_roles: string[];
  status: string;
  auto_finish_date: string;
  auto_finish_time: string;
  team_expiry_date: string;
  invite_link: string;
  is_admin: boolean;
  team_id?: number;
  members?: TeamMember[];
  teams?: {
    id: number;
    members: TeamMember[];
  }[];
}

interface TeamMember {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  role: string;
  tg_link: string;
}

const MemberPage = () => {
  const distributionsData: Distribution[] = mockData.Distributions || [];
  
  const currentUser = mockData.User;

  const userDistributions = distributionsData.filter(dist => !dist.is_admin);

  const location = useLocation();
  const distributionId = location.state?.distributionId;
  let selectedDistribution: Distribution | null = null;
  
  if (distributionId) {
    selectedDistribution = userDistributions.find(dist => dist.id === distributionId) || null;
  }

  let distributionsToShow = [...userDistributions];
  
  if (selectedDistribution) {
    distributionsToShow = distributionsToShow.filter(dist => dist.id !== selectedDistribution!.id);
    distributionsToShow.unshift(selectedDistribution);
  }

  // Функция для получения команды пользователя в распределении
  const getUserTeam = (distribution: Distribution) => {
    // Если в распределении есть команды, находим команду с текущим пользователем
    if (distribution.teams && distribution.teams.length > 0) {
      for (const team of distribution.teams) {
        const userInTeam = team.members.some(member => 
          member.tg_link === currentUser.tgLink || 
          (member.firstName === currentUser.firstName && member.lastName === currentUser.lastName)
        );
        if (userInTeam) {
          return team;
        }
      }
    }
    return null;
  };

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
    const userTeam = getUserTeam(distribution);
    
    if (distribution.status === 'active') {
      return 'В стадии формирования';
    } else if (distribution.status === 'completed' || distribution.status === 'end') {
      if (userTeam) {
        return 'Ваша команда сформирована';
      } else {
        return 'Вы не вошли в команду';
      }
    }
    return 'Статус неизвестен';
  };

  // Преобразуем TeamMember в формат для компонента Team
  const convertToTeamComponentFormat = (team: { members: TeamMember[] }) => {
    return team.members.map(member => ({
      id: member.id,
      role: member.role,
      name: `${member.lastName} ${member.firstName} ${member.middleName}`,
      telegram: member.tg_link
    }));
  };

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
        const userTeam = getUserTeam(distribution);
        const showTeam = (distribution.status === 'completed' || distribution.status === 'end') && userTeam;
        
        return (
          <div key={distribution.id} className="distribution-card" style={{ 
            marginTop: index > 0 ? '30px' : '0',
            border: selectedDistribution && index === 0 ? '2px solid #007bff' : 'none'
          }}>
            <div className='distribution-card_info'>
              {/* Статус распределения */}
              <p className='distribution-card_info-status'>{getStatusText(distribution.status)}</p>
              
              {/* Название группы */}
              <div className='distribution-card_info-project'>
                <p className='distribution-card_info-project_title'>Название группы</p>
                <div className='distribution-card_info-project_text'>{distribution.name}</div>
              </div>
              
              {/* Дата и время распределения */}
              <div className='distribution-card_info-project'>
                <span className='distribution-card_info-project_title'>Дата и время распределения</span>
                <div className='distribution-card_info-project_text'>
                  {formatDateTime(distribution.auto_finish_date, distribution.auto_finish_time)}
                </div>
              </div>
              
              {/* Дата окончания проектов */}
              <div className='distribution-card_info-project'>
                <span className='distribution-card_info-project_title'>Дата окончания проектов</span>
                <div className='distribution-card_info-project_text'>
                  {formatDate(distribution.team_expiry_date)}
                </div>
              </div>
              
              <h3 className='distribution-card_info-team-title'>Команда</h3>
              
              {/* Статус команды */}
              <span className='distribution-card_info-team-status'>
                {getTeamStatus(distribution)}
              </span>
              
              {/* Если команда сформирована и пользователь в ней */}
              {showTeam && (
                <Team teamMembers={convertToTeamComponentFormat(userTeam!)} />
              )}
              
              {/* Необходимые роли */}
              {!showTeam && (
                <div className='distribution-card_info-competencies'>
                {distribution.possible_roles.map((role, roleIndex) => (
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