import "./JoinedMembers.css"
import userIcon from '../../../../assets/user-in-team-icon.svg'
import mockData from '../../../../Mocks';

interface TeamMember {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  role: string;
  tg_link: string;
}

interface JoinedMembersProps {
  distributionId?: number;
}

const JoinedMembers: React.FC<JoinedMembersProps> = ({ distributionId }) => {
    console.log()
  // Находим распределение по ID
  const distribution = mockData.Distributions.find(dist => dist.id === distributionId);
  
  // Получаем участников распределения
  const members = distribution?.members || [];

  // Форматируем имя участника
  const formatMemberName = (member: TeamMember) => {
    return `${member.lastName} ${member.firstName} ${member.middleName}`;
  };

  return (
    <div className="joined-members-container">
      <h2 className="joined-members-container_title">Присоединившиеся участники</h2>
      
      <div className="number-of-memmbers">
        <span className="number-of-memmbers_text">Количество присоединившихся участников</span>
        <div className="number-of-memmbers_count">{members.length}</div>
      </div>

      {members.length === 0 ? (
        <p className="no-members-message">Участники еще не присоединились к распределению</p>
      ) : (
        members.map((member) => (
          <div key={member.id} className="member-in-team">
            <img src={userIcon} alt="Иконка участника" />
            <p className="member-in-team_name">{formatMemberName(member)}</p>
            <div className="member-in-team_competencies">
              <div className="member-in-team_competencies-item">{member.role}</div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default JoinedMembers;