import { whyRensor } from '../../data/projects';
import SectionReveal from '../ui/SectionReveal';
import './WhyRensor.css';

export default function WhyRensor() {
  return (
    <section className="why-rensor section" id="why-rensor" aria-label="Why RENSOR">
      <div className="why-rensor__inner container">
        <SectionReveal>
          <h2 className="why-rensor__heading text-h1">
            WE DON'T BUILD WEBSITES JUST TO FILL A SCREEN.
          </h2>
        </SectionReveal>

        <div className="why-rensor__grid">
          {whyRensor.map((item, index) => (
            <SectionReveal key={item.title} delay={index * 0.08}>
              <div className="why-card">
                <div className="why-card__marker" aria-hidden="true"></div>
                <h3 className="why-card__title text-h3">{item.title}</h3>
                <p className="why-card__description text-body">{item.description}</p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
