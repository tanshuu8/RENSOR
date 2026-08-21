import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProjectForm from '../components/contact/ProjectForm';
import './Contact.css';

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isSubmitted) {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { immediate: true });
      }
    }
  }, [isSubmitted]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <section className={`contact-page section ${isSubmitted ? 'contact-page--submitted' : ''}`} aria-label="Start a project">
        <div className="contact-page__inner container">
          {!isSubmitted && (
            <div className="contact-page__header">
              <span className="text-label">Contact</span>
              <h1 className="text-display">LET'S BUILD SOMETHING.</h1>
              <p className="text-body-lg contact-page__subtitle">
                Tell us about your project. We'll review it and get back to you soon.
              </p>
            </div>
          )}

          <div className="contact-page__content">
            <div className="contact-page__form-area">
              <ProjectForm isSubmitted={isSubmitted} onSubmitted={() => setIsSubmitted(true)} />
            </div>

            <div className="contact-page__info">
              <div className="contact-info-block">
                <h3 className="contact-info-block__title text-label">Email</h3>
                <a href="mailto:rensor.studio@gmail.com" className="contact-info-block__link">
                  rensor.studio@gmail.com
                </a>
              </div>
              <div className="contact-info-block">
                <h3 className="contact-info-block__title text-label">Social</h3>
                <a
                  href="https://instagram.com/rensor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-info-block__link"
                >
                  Instagram
                </a>
                <a
                  href="https://linkedin.com/company/rensor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-info-block__link"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
