import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SectionReveal from '../components/ui/SectionReveal';
import './AboutPage.css';

export default function AboutPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <section className="about-page section" aria-label="About RENSOR">
        <div className="about-page__inner container">
          <div className="about-page__header">
            <span className="text-label">About</span>
            <h1 className="text-display">WE MAKE BUSINESSES WORK BETTER ONLINE.</h1>
          </div>

          <div className="about-page__content">
            <SectionReveal>
              <div className="about-page__intro">
                <p className="text-body-lg">
                  RENSOR is an independent digital studio focused on creating thoughtful, high-performance websites, digital products and intelligent experiences.
                </p>
                <p className="text-body-lg">
                  We combine strategy, design and technology to help businesses become easier to understand, easier to trust and easier to interact with.
                </p>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.1}>
              <div className="about-page__values">
                <h2 className="text-h2 about-page__values-heading">WHAT WE BELIEVE</h2>
                <div className="about-page__values-grid">
                  <div className="about-value">
                    <h3 className="about-value__title text-h3">Design is communication</h3>
                    <p className="text-body">Every visual decision should make the business easier to understand.</p>
                  </div>
                  <div className="about-value">
                    <h3 className="about-value__title text-h3">Quality over quantity</h3>
                    <p className="text-body">We'd rather build fewer things well than many things poorly.</p>
                  </div>
                  <div className="about-value">
                    <h3 className="about-value__title text-h3">No filler</h3>
                    <p className="text-body">Every section, every page, every interaction has a reason to exist.</p>
                  </div>
                  <div className="about-value">
                    <h3 className="about-value__title text-h3">Built to last</h3>
                    <p className="text-body">We build with performance, scalability, and the long term in mind.</p>
                  </div>
                </div>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              <div className="about-page__cta">
                <h2 className="text-h2">LET'S WORK TOGETHER.</h2>
                <p className="text-body-lg">
                  If you're looking for a studio that takes design seriously, we'd love to hear about your project.
                </p>
                <Link to="/contact" className="btn btn-primary" id="about-cta-btn">
                  START A PROJECT <span className="arrow">↗</span>
                </Link>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
