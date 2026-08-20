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
              WE MAKE BUSINESSES LOOK BETTER ONLINE.
            </h2>
            <p className="text-body-lg about-preview__body">
              RENSOR is a digital design and development studio focused on creating thoughtful, high-performance websites, digital experiences and brand identities.
            </p>
            <p className="text-body about-preview__body">
              We combine strategy, design and technology to help businesses become easier to understand, easier to trust and harder to forget.
            </p>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
