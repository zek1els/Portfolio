import { useState, useEffect } from 'react';
import ProjectCard from '../components/ProjectCard';
import Loader from '../components/Loader';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects');
        if (!res.ok) throw new Error('Erreur lors du chargement des projets');
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const allTechs = [...new Set(projects.flatMap((p) => p.technologies))];

  const filtered =
    filter === 'all'
      ? projects
      : projects.filter((p) => p.technologies.includes(filter));

  return (
    <main className="page projects-page">
      <section className="page-header">
        <h1>Mes projets</h1>
        <p>Quelques trucs que j'ai faits.</p>
      </section>

      {loading && <Loader />}
      {error && <div className="error-message">{error}</div>}

      {!loading && !error && (
        <>
          <div className="filter-bar">
            <button
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              Tous
            </button>
            {allTechs.map((tech) => (
              <button
                key={tech}
                className={`filter-btn ${filter === tech ? 'active' : ''}`}
                onClick={() => setFilter(tech)}
              >
                {tech}
              </button>
            ))}
          </div>

          <div className="projects-grid">
            {filtered.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="no-results">Aucun projet trouvé pour ce filtre.</p>
          )}
        </>
      )}
    </main>
  );
}
