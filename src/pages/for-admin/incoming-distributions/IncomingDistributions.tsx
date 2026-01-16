import FormedTeams from "../components/formed-teams/FormedTeams";

import "./IncomingDistributions.css"


const IncomingDistributions = () => {
    return (
        <>
            <nav className="incoming-distributions-nav">
                <button
                    className="incoming-distributions-nav-button"
                >
                    Разработка сайта
                </button>
                <button
                    className="incoming-distributions-nav-button"
                >
                    Разработка сайта
                </button>
            </nav>
            <div className="incoming-distributions-content">
                <FormedTeams />
            </div>
        </>
    );
};

export default IncomingDistributions;