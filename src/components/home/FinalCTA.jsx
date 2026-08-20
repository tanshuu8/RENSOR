import { Link } from 'react-router-dom';
import SectionReveal from '../ui/SectionReveal';
import './FinalCTA.css';

export default function FinalCTA() {
  return (
    <section className="final-cta" id="final-cta" aria-label="Start a project">
      <div className="final-cta__inner container">
        <SectionReveal>
          <div className="final-cta__content">
            <h2 className="final-cta__heading text-h1">
              READY TO BUILD<br />
              SOMETHING BETTER?
            </h2>
            <p className="final-cta__supporting">
              Tell us what you're working on.
            </p>
            <Link to="/contact" className="btn btn-primary final-cta__btn" id="final-cta-btn">
              LET'S TALK <span className="arrow">↗</span>
            </Link>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
