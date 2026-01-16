import "./ProjectIdeas.css"

import teamImage from '../../assets/main-page-img.svg';


const ProjectIdeasPage = () => {
  return (
    <div className="project-ideas-container">
        <p className="project-ideas-text">
            Скоро здесь появится возможность искать идеи для проектов и делиться ими с другими!
        </p>
        <img className="project-ideas-img" src={teamImage} alt="" />
    </div>
  );
};

export default ProjectIdeasPage;