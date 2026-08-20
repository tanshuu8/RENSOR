import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero" id="hero" aria-label="Hero">
      <div className="hero__inner container">
        <div className="hero__content">
          <motion.div
            className="hero__text"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="hero__headline">
              WE BUILD DIGITAL <br />
              EXPERIENCES THAT <br />
              MOVE BUSINESSES <br />
              FORWARD.
            </h1>
          </motion.div>

          <motion.p
            className="hero__supporting text-body-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            RENSOR is a digital studio creating high-performance websites and brands for ambitious businesses.
          </motion.p>

          <motion.div
            className="hero__cta-group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link to="/contact" className="btn btn-primary" id="hero-cta-primary">
              START A PROJECT <span className="arrow">↗</span>
            </Link>
            <Link to="/work" className="btn btn-secondary" id="hero-cta-secondary">
              VIEW OUR WORK <span className="arrow">↗</span>
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="hero__image-wrapper"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src="/images/hero-architecture.jpg"
            alt="Contemporary minimal architecture — concrete, glass and geometric forms in a desaturated editorial style"
            className="hero__image"
            loading="eager"
            fetchpriority="high"
          />
        </motion.div>
      </div>
    </section>
  );
}
