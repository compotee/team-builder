import Team from "../../../../components/team/Team";

import "./FormedTeams.css"


const FormedTeams = () => {
    return (
        <>
            <div className="information-container">
                <h2 className="information-container-title">Информация о распределении</h2>
                <div className="information-container-item">
                    <span className="information-container-item-span">Название группы</span>
                    <div className="information-container-item-div">Разработка сайта</div>
                </div>
                <div className="information-container-items">
                    <div className="information-container-item">
                        <span className="information-container-item-span">Дата и время распределения</span>
                        <div className="information-container-item-div">25.01.2026 11:00</div>
                    </div>
                    <div className="information-container-item">
                        {/* тут нужно ещё добавить значек вопроса с подсказкой */}
                        <span className="information-container-item-span">Дата окончания проектов</span>
                        <div className="information-container-item-div">25.07.2026</div>
                    </div>
                </div>
            </div>
            <div className="formed-teams-container">
                <h2 className="formed-teams-container-title">Сформированные команды</h2>
                <div className="teams-container">
                    <div className="teams-container-item">
                        <p className="teams-container-item-title">Команда 1</p>
                        <Team />
                    </div>
                    <div className="teams-container-item">
                        <p className="teams-container-item-title">Команда 2</p>
                        <Team />
                    </div>
                    <div className="teams-container-item">
                        <p className="teams-container-item-title">Команда 3</p>
                        <Team />
                    </div>
                </div>
            </div>
        </>
    );
};

export default FormedTeams;