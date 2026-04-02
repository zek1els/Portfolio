import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Loader from '../components/Loader';

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/projects/${id}`);
        if (!res.ok) throw new Error('Projet introuvable');
        const data = await res.json();
        setProject(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading) return <Loader />;
  if (error)
    return (
      <main className="page">
        <div className="error-message">{error}</div>
        <Link to="/projects" className="btn btn-outline">
          Retour aux projets
        </Link>
      </main>
    );

  return (
    <main className="page project-detail-page">
      <Link to="/projects" className="back-link">
        ← Retour aux projets
      </Link>

      {(project.imageUrl || project.emoji) && (
        <div className="detail-image">
          {project.emoji && !project.imageUrl ? (
            <div className="detail-emoji">{project.emoji}</div>
          ) : (
            <img src={project.imageUrl} alt={project.title} />
          )}
        </div>
      )}

      <div className="detail-content">
        <h1>{project.title}</h1>

        <div className="detail-techs">
          {project.technologies.map((tech) => (
            <span key={tech} className="tech-tag">
              {tech}
            </span>
          ))}
        </div>

        <div className="detail-description">
          <h2>Description</h2>
          <p>{project.longDescription || project.description}</p>
        </div>

        <div className="detail-links">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              Code Source
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Voir en ligne
            </a>
          )}
        </div>
      </div>
    </main>
  );
}
