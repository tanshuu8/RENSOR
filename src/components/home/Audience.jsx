import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audiences } from '../../data/projects';
import SectionReveal from '../ui/SectionReveal';
import './Audience.css';

export default function Audience() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleCard = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="audience section" id="audience" aria-label="Who We Build For">
      <div className="audience__inner container">
        <SectionReveal>
          <div className="audience__header">
            <span className="text-label">Clients</span>
            <h2 className="text-h1">WHO WE BUILD FOR</h2>
            <p className="text-body-lg audience__subtitle">
              From growing businesses to ambitious startups, RENSOR builds digital experiences around how people discover, understand and interact with what you do.
            </p>
          </div>
        </SectionReveal>

        <div className="audience__grid">
          {audiences.map((audience, index) => (
            <SectionReveal key={audience.title} delay={index * 0.06}>
              <div
                className={`audience-card ${openIndex === index ? 'audience-card--open' : ''}`}
              >
                <button
                  className="audience-card__header"
                  onClick={() => toggleCard(index)}
                  aria-expanded={openIndex === index}
                  aria-controls={`audience-content-${index}`}
                  id={`audience-btn-${index}`}
                >
                  <h3 className="audience-card__title text-h3">{audience.title}</h3>
                  <span className="audience-card__toggle" aria-hidden="true">
                    {openIndex === index ? '−' : '+'}
                  </span>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      id={`audience-content-${index}`}
                      className="audience-card__content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      role="region"
                      aria-labelledby={`audience-btn-${index}`}
                    >
                      <div className="audience-card__items">
                        {audience.items.map((item) => (
                          <span key={item} className="audience-pill">
                            {item}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
