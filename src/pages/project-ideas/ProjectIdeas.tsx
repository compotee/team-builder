import "./ProjectIdeas.css"

import teamImage from '../../assets/main-page-img.svg';


const ProjectIdeasPage = () => {
  return (
    <div className="container">
        <p className="project-ideas-text">
            Скоро здесь появится возможность искать идеи для проектов и делаиться ими с другими!
        </p>
        <img src={teamImage} alt="" />
    </div>
  );
};

export default ProjectIdeasPage;