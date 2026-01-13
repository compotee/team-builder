import "./СurrentDistributions.css"

import linkIcon from "../../../assets/link-icon.svg"


const СurrentDistributions = () => {
    return (
        <div className="current-distributions-container">
            <ul className="distributions-list">
                <li className="distributions-list_title">Команды сформированы</li>
                <li className="distributions-list_item">
                    <div className="distributions-list_item-name">Разработка сайта</div>
                    <a className="distributions-list_item-link" href="">
                        <img className="distributions-list_item-link-img" src={linkIcon} alt="" />
                    </a>
                </li>
            </ul>
            <ul className="distributions-list">
                <li className="distributions-list_title">Команды не сформированы</li>
                <li className="distributions-list_item">
                    <div className="distributions-list_item-name">Разработка сайта</div>
                    <a className="distributions-list_item-link" href="">
                        <img className="distributions-list_item-link-img" src={linkIcon} alt="" />
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default СurrentDistributions;