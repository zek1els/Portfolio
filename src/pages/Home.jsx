import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';
import Loader from '../components/Loader';

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadFeatured() {
      try {
        const res = await fetch('/api/projects');
        if (!res.ok) throw new Error('Erreur lors du chargement des projets');
        const data = await res.json();
        setFeatured(data.filter((p) => p.featured).slice(0, 3));
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    loadFeatured();
  }, []);

  return (
    <main className="page home-page">
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-greeting">Bonjour, je suis</span>
          <h1>Maxime Imbeault</h1>
          <p className="hero-subtitle">
            Étudiant en informatique au Cégep de Valleyfield. Je code surtout
            des choses que j'utilise, en dehors de mes cours.
          </p>
          <div className="hero-actions">
            <Link to="/projects" className="btn btn-primary">
              Voir mes projets
            </Link>
            <Link to="/contact" className="btn btn-outline">
              Me contacter
            </Link>
          </div>
          <div className="hero-socials">
            <a
              href="https://github.com/zek1els"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/maxime-imbeault-553b27309/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      <section className="about-section">
        <h2>A propos</h2>
        <div className="about-content">
          <p>
            Mon principal projet c'est Kova, un bot Discord avec une interface
            web pour le configurer. J'aime aussi gérer mes propres serveurs :
            Kova et ce portfolio tournent tous les deux sur ma machine.
          </p>
          <div className="skills-grid">
            {[
              'JavaScript',
              'React',
              'Node.js',
              'Express',
              'MongoDB',
              'Discord.js',
              'HTML/CSS',
              'Git',
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
        {isLoading && <Loader />}
        {error && <div className="error-message">{error}</div>}
        {!isLoading && !error && (
          <div className="projects-grid">
            {featured.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
