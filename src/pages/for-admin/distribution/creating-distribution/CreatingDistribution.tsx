import "./CreatingDistribution.css"


const CreatingDistribution = () => {
    return (
        <div>
            <p>1. Заполните данные о распределении</p>
            <div>
                <span></span>
                <input type="text" />
            </div>
            <div>
                <span></span>
                <input type="number" />
            </div>
            <p>2.  Выберите роли, которые необходимы в проекте</p>
            <p>3. Заполните данные о временных метриках распределения</p>
            <div>
                <span></span>
                <input type="text" />
            </div>
            <div>
                <span></span>
                <input type="number" />
            </div>
            <div>
                <span></span>
                <input type="number" />
            </div>
            <button className="button button--inactive-pending">Запустить распределение</button>
        </div>
    );
};

export default CreatingDistribution;