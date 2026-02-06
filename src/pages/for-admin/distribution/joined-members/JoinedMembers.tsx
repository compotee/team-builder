import { useState, useEffect } from 'react';
import "./JoinedMembers.css"
import userIcon from '../../../../assets/user-in-team-icon.svg'
import { api, type DistributionMember } from '../../../../api';

interface JoinedMembersProps {
  distributionId?: number;
}

const JoinedMembers: React.FC<JoinedMembersProps> = ({ distributionId }) => {
    const [members, setMembers] = useState<DistributionMember[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (distributionId) {
            const fetchMembers = async () => {
                setIsLoading(true);
                setError(null);
                try {
                    const response = await api.distributions.getMembers(distributionId);
                    setMembers(response.members);
                } catch (err: unknown) {
                    setError('Не удалось загрузить участников');
                    console.error('Failed to load members:', err);
                } finally {
                    setIsLoading(false);
                }
            };

            fetchMembers();
        }
    }, [distributionId]);

    if (isLoading) {
        return <div className="joined-members-container">Загрузка...</div>;
    }

    if (error) {
        return <div className="joined-members-container">{error}</div>;
    }

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
                        <p className="member-in-team_name">{member.username}</p>
                        <div className="member-in-team_competencies">
                            <div className="member-in-team_competencies-item">Участник</div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default JoinedMembers;