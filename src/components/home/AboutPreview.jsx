import SectionReveal from '../ui/SectionReveal';
import './AboutPreview.css';

export default function AboutPreview() {
  return (
    <section className="about-preview section" id="about" aria-label="About RENSOR">
      <div className="about-preview__inner container">
        <SectionReveal>
          <div className="about-preview__content">
            <span className="text-label">About</span>
            <h2 className="about-preview__heading text-h1">
              WE MAKE BUSINESSES WORK BETTER ONLINE.
            </h2>
            <p className="text-body-lg about-preview__body">
              RENSOR is an independent digital studio focused on creating thoughtful, high-performance websites, digital products and intelligent experiences.
            </p>
            <p className="text-body about-preview__body">
              We combine strategy, design and technology to help businesses become easier to understand, easier to trust and easier to interact with.
            </p>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
