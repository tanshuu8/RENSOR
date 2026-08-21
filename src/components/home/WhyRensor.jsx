import { whyRensor } from '../../data/projects';
import SectionReveal from '../ui/SectionReveal';
import LineReveal from '../ui/LineReveal';
import './WhyRensor.css';

export default function WhyRensor() {
  return (
    <section className="why-rensor section" id="why-rensor" aria-label="Why RENSOR">
      <div className="why-rensor__inner container">
        <LineReveal
          lines={[
            "WE DON'T BUILD",
            "WEBSITES JUST TO",
            "FILL A SCREEN.",
          ]}
          as="h2"
          className="why-rensor__heading text-h1"
          stagger={0.06}
        />

        <div className="why-rensor__grid">
          {whyRensor.map((item, index) => (
            <SectionReveal key={item.title} delay={index * 0.06} distance={20}>
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
