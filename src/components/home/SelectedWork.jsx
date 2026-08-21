import { Link } from 'react-router-dom';
import { projects } from '../../data/projects';
import SectionReveal from '../ui/SectionReveal';
import './SelectedWork.css';

export default function SelectedWork() {
  return (
    <section className="selected-work section" id="work" aria-label="Selected Concepts">
      <div className="selected-work__inner container">
        <SectionReveal>
          <div className="selected-work__header">
            <span className="text-label">Concepts</span>
            <h2 className="text-h1">SELECTED CONCEPTS</h2>
            <p className="text-body-lg selected-work__subtitle">
              Explorations across industries we're built to serve.
            </p>
          </div>
        </SectionReveal>

        <div className="selected-work__grid">
          {projects.map((project, index) => (
            <SectionReveal key={project.slug} delay={index * 0.08} distance={24}>
              <Link
                to={`/work/${project.slug}`}
                className="project-block"
                id={`project-${project.slug}`}
              >
                <div className="project-block__image-wrapper">
                  <img
                    src={project.heroImage}
                    alt={`${project.title} — ${project.category} concept project by RENSOR`}
                    className="project-block__image"
                    loading={index === 0 ? 'eager' : 'lazy'}
                  />
                  <div className="project-block__overlay">
                    <span className="project-block__view">
                      VIEW CONCEPT <span className="arrow">↗</span>
                    </span>
                  </div>
                </div>

                <div className="project-block__info">
                  <div className="project-block__meta">
                    <span className="project-block__number text-label">{project.number}</span>
                    <span className="project-block__divider">/</span>
                    <h3 className="project-block__title">{project.title}</h3>
                  </div>
                  <div className="project-block__details">
                    <span className="project-block__category text-label">{project.category}</span>
                    <span className="project-block__type text-label">{project.type}</span>
                  </div>
                </div>
              </Link>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
