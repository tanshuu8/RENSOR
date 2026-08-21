import SectionReveal from '../ui/SectionReveal';
import './Positioning.css';

export default function Positioning() {
  return (
    <section className="positioning section" id="positioning" aria-label="Positioning statement">
      <div className="positioning__inner container">
        <SectionReveal distance={20}>
          <p className="positioning__statement text-h1">
            BUILT AT THE INTERSECTION OF DESIGN & TECHNOLOGY.
          </p>
        </SectionReveal>
      </div>
    </section>
  );
}
