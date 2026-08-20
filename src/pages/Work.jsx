import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projects } from '../data/projects';
import SectionReveal from '../components/ui/SectionReveal';
import './Work.css';

export default function Work() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      <section className="work-page section" aria-label="Selected Concepts">
        <div className="work-page__inner container">
          <div className="work-page__header">
            <span className="text-label">Concepts</span>
            <h1 className="text-display">SELECTED CONCEPTS</h1>
            <p className="text-body-lg work-page__subtitle">
              A selection of websites conceptualized and designed by RENSOR across different industries.
            </p>
          </div>

          <div className="work-page__grid">
            {projects.map((project, index) => (
              <SectionReveal key={project.slug} delay={index * 0.1}>
                <Link
                  to={`/work/${project.slug}`}
                  className="work-card"
                  id={`work-card-${project.slug}`}
                >
                  <div className="work-card__image-wrapper">
                    <img
                      src={project.heroImage}
                      alt={`${project.title} — ${project.category} concept project by RENSOR`}
                      className="work-card__image"
                      loading={index === 0 ? 'eager' : 'lazy'}
                    />
                    <div className="work-card__overlay">
                      <span className="work-card__view">
                        VIEW CONCEPT <span className="arrow">↗</span>
                      </span>
                    </div>
                  </div>

                  <div className="work-card__info">
                    <div className="work-card__meta">
                      <span className="work-card__number text-label">{project.number}</span>
                      <span className="work-card__divider">/</span>
                      <h2 className="work-card__title">{project.title}</h2>
                    </div>
                    <div className="work-card__tags">
                      <span className="work-card__category text-label">{project.category}</span>
                      <span className="work-card__type text-label">{project.type}</span>
                    </div>
                  </div>
                </Link>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
