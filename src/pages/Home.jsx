import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';
import Loader from '../components/Loader';

export default function Home() {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch('/api/projects');
        if (!res.ok) throw new Error('Erreur lors du chargement des projets');
        const data = await res.json();
        setFeaturedProjects(data.filter((p) => p.featured).slice(0, 3));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <main className="page home-page">
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-greeting">Bonjour, je suis</span>
          <h1>Maxime Imbeault</h1>
          <p className="hero-subtitle">
            Développeur Full-Stack passionné par la création d'applications web
            modernes et performantes.
          </p>
          <div className="hero-actions">
            <Link to="/projects" className="btn btn-primary">
              Voir mes projets
            </Link>
            <Link to="/contact" className="btn btn-outline">
              Me contacter
            </Link>
          </div>
        </div>
      </section>

      <section className="about-section">
        <h2>A propos</h2>
        <div className="about-content">
          <p>
            Je suis un développeur web full-stack spécialisé dans l'écosystème
            JavaScript. J'aime concevoir des solutions élégantes à des problèmes
            complexes en utilisant les technologies modernes comme React, Node.js
            et MongoDB.
          </p>
          <div className="skills-grid">
            {[
              'React',
              'Node.js',
              'MongoDB',
              'Express',
              'JavaScript',
              'HTML/CSS',
              'Git',
              'REST API',
            ].map((skill) => (
              <span key={skill} className="skill-item">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="featured-section">
        <div className="section-header">
          <h2>Projets en vedette</h2>
          <Link to="/projects" className="btn btn-outline btn-sm">
            Voir tout
          </Link>
        </div>
        {loading && <Loader />}
        {error && <div className="error-message">{error}</div>}
        {!loading && !error && (
          <div className="projects-grid">
            {featuredProjects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
