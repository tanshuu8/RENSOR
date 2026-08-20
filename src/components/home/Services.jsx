import { services } from '../../data/projects';
import SectionReveal from '../ui/SectionReveal';
import './Services.css';

export default function Services() {
  return (
    <section className="services section" id="services" aria-label="Services">
      <div className="services__inner container">
        <SectionReveal>
          <div className="services__header">
            <span className="text-label">Services</span>
            <h2 className="text-h1">WHAT WE DO</h2>
          </div>
        </SectionReveal>

        <div className="services__grid">
          {services.map((service, index) => (
            <SectionReveal key={service.number} delay={index * 0.08}>
              <div className="service-card">
                <div className="service-card__top">
                  <span className="service-card__number">{service.number}</span>
                  <div className="service-card__line"></div>
                </div>
                <h3 className="service-card__title text-h3">{service.title}</h3>
                <p className="service-card__tagline">{service.tagline}</p>
                <p className="service-card__description text-body">{service.description}</p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
