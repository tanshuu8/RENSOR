import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { services } from '../data/projects';
import SectionReveal from '../components/ui/SectionReveal';
import './ServicesPage.css';

export default function ServicesPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <section className="services-page section" aria-label="Our Services">
        <div className="services-page__inner container">
          <div className="services-page__header">
            <span className="text-label">Services</span>
            <h1 className="text-display">WHAT WE DO</h1>
            <p className="text-body-lg services-page__subtitle">
              We help businesses build a stronger digital presence through design, development and branding.
            </p>
          </div>

          <div className="services-page__list">
            {services.map((service, index) => (
              <SectionReveal key={service.number} delay={index * 0.1}>
                <div className="service-block">
                  <div className="service-block__header">
                    <span className="service-block__number">{service.number}</span>
                    <h2 className="service-block__title text-h2">{service.title}</h2>
                  </div>
                  <div className="service-block__body">
                    <p className="service-block__tagline">{service.tagline}</p>
                    <p className="service-block__description text-body">{service.description}</p>
                    <div className="service-block__details">
                      {service.details.map((detail) => (
                        <span key={detail} className="service-block__detail-tag">{detail}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal delay={0.3}>
            <div className="services-page__cta">
              <h2 className="text-h2">NEED SOMETHING SPECIFIC?</h2>
              <p className="text-body-lg">Every project is different. Tell us what you need and we'll figure out the best approach together.</p>
              <Link to="/contact" className="btn btn-primary" id="services-cta-btn">
                START A PROJECT <span className="arrow">↗</span>
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>
    </motion.div>
  );
}
