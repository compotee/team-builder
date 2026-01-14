import "./JoinedMembers.css"

import userIcon from '../../../../assets/user-in-team-icon.svg'


const JoinedMembers = () => {
    return (
        <div className="joined-members-container">
            <h2 className="joined-members-container_title">Присоединившиеся участники</h2>
            <div className="number-of-memmbers">
                <span className="number-of-memmbers_text">Количество присоединившихся участников </span>
                {/* длина списка участников */}
                <div className="number-of-memmbers_count">10</div>
            </div>
            {/* тут участники через if */}
            {Array.from({ length: 15 }, (_, index) => (
                <div key={index} className="member-in-team">
                    <img src={userIcon} alt="Иконка участника" />
                    <p className="member-in-team_name">Петров Петр Петрович</p>
                    <div className="member-in-team_competencies">
                    <div className="member-in-team_competencies-item">Аналитик</div>
                    <div className="member-in-team_competencies-item">Дизайнер</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default JoinedMembers;