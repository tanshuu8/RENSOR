import { processSteps } from '../../data/projects';
import SectionReveal from '../ui/SectionReveal';
import './Process.css';

export default function Process() {
  return (
    <section className="process section" id="process" aria-label="Our Process">
      <div className="process__inner container">
        <SectionReveal>
          <div className="process__header">
            <span className="text-label">How We Work</span>
            <h2 className="text-h1">OUR PROCESS</h2>
          </div>
        </SectionReveal>

        <div className="process__timeline">
          {processSteps.map((step, index) => (
            <SectionReveal key={step.number} delay={index * 0.08}>
              <div className="process-step">
                <div className="process-step__number-wrap">
                  <span className="process-step__number">{step.number}</span>
                  {index < processSteps.length - 1 && (
                    <div className="process-step__connector" aria-hidden="true"></div>
                  )}
                </div>
                <div className="process-step__content">
                  <h3 className="process-step__title text-h3">{step.title}</h3>
                  <p className="process-step__description text-body">{step.description}</p>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
