import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { processSteps } from '../data/projects';
import SectionReveal from '../components/ui/SectionReveal';
import './ProcessPage.css';

export default function ProcessPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <section className="process-page section" aria-label="Our Process">
        <div className="process-page__inner container">
          <div className="process-page__header">
            <span className="text-label">How We Work</span>
            <h1 className="text-display">OUR PROCESS</h1>
            <p className="text-body-lg process-page__subtitle">
              Every project follows a clear, structured process — from understanding your business to launching your website.
            </p>
          </div>

          <div className="process-page__steps">
            {processSteps.map((step, index) => (
              <SectionReveal key={step.number} delay={index * 0.1}>
                <div className="process-page-step">
                  <div className="process-page-step__number-wrap">
                    <span className="process-page-step__number">{step.number}</span>
                  </div>
                  <div className="process-page-step__content">
                    <h2 className="process-page-step__title text-h2">{step.title}</h2>
                    <p className="process-page-step__description text-body-lg">{step.description}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal delay={0.4}>
            <div className="process-page__cta">
              <h2 className="text-h2">READY TO START?</h2>
              <p className="text-body-lg">Tell us about your project and we'll walk you through every step.</p>
              <Link to="/contact" className="btn btn-primary" id="process-cta-btn">
                START A PROJECT <span className="arrow">↗</span>
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>
    </motion.div>
  );
}
