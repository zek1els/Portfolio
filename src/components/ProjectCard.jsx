import { Link } from 'react-router-dom';

export default function ProjectCard({ project }) {
  return (
    <article className="project-card">
      {(project.imageUrl || project.emoji) && (
        <div className="project-card-image">
          {project.emoji && !project.imageUrl ? (
            <div className="project-card-emoji">{project.emoji}</div>
          ) : (
            <img src={project.imageUrl} alt={project.title} loading="lazy" />
          )}
          {project.featured && <span className="badge">Featured</span>}
        </div>
      )}
      <div className="project-card-content">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="project-card-techs">
          {project.technologies.map((tech) => (
            <span key={tech} className="tech-tag">
              {tech}
            </span>
          ))}
        </div>
        <Link to={`/projects/${project._id}`} className="btn btn-primary">
          Voir détails
        </Link>
      </div>
    </article>
  );
}
