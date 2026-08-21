import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import './Hero.css';

export default function Hero() {
  const heroRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  // Subtle scroll-linked motion
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : -28]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.8], [1, shouldReduceMotion ? 1 : 0.4]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : 20]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, shouldReduceMotion ? 1 : 1.025]);

  return (
    <section className="hero" id="hero" aria-label="Hero" ref={heroRef}>
      <div className="hero__inner container">
        <motion.div
          className="hero__content"
          style={{ y: textY, opacity: textOpacity, willChange: 'transform' }}
        >
          <motion.div
            className="hero__text"
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
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
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            RENSOR is a digital studio creating high-performance websites, digital products and AI-powered experiences for ambitious businesses.
          </motion.p>

          <motion.div
            className="hero__cta-group"
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link to="/contact" className="btn btn-primary" id="hero-cta-primary">
              START A PROJECT <span className="arrow">↗</span>
            </Link>
            <Link to="/work" className="btn btn-secondary" id="hero-cta-secondary">
              VIEW OUR WORK <span className="arrow">↗</span>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero__image-wrapper"
          style={{ y: imageY, scale: imageScale, willChange: 'transform' }}
          initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
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
