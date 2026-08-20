import { useParams, Link, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { projects } from '../data/projects';
import SectionReveal from '../components/ui/SectionReveal';
import './ProjectDetail.css';

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  // Scroll to top on mount / slug change
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true });
    }

    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { immediate: true });
      }
    }, 60);

    return () => clearTimeout(timer);
  }, [slug]);

  // Set per-page SEO metadata
  useEffect(() => {
    if (project?.seo) {
      document.title = project.seo.title;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', project.seo.description);
    }
    return () => {
      document.title = 'RENSOR — Digital Design & Development Studio';
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc)
        metaDesc.setAttribute(
          'content',
          'RENSOR designs and develops premium websites, digital experiences and brand identities for businesses, startups, brands and creators.'
        );
    };
  }, [project]);

  if (!project) {
    return <Navigate to="/work" replace />;
  }

  return (
    <motion.div
      key={slug}
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* ---- 1. Concept Hero (text only, no image) ---- */}
      <section className="concept-hero" aria-label={`${project.title} concept`}>
        <div className="concept-hero__inner container">
          <SectionReveal>
            <span className="text-label concept-hero__label">SELF-INITIATED CONCEPT</span>
          </SectionReveal>
          <SectionReveal delay={0.05}>
            <div className="concept-hero__number">{project.number}</div>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <h1 className="text-display concept-hero__title">{project.title}</h1>
          </SectionReveal>
          <SectionReveal delay={0.15}>
            <p className="concept-hero__category">{project.category}</p>
          </SectionReveal>
          <SectionReveal delay={0.2}>
            <p className="concept-hero__positioning">{project.positioning}</p>
          </SectionReveal>
        </div>
      </section>

      {/* ---- 2. Context ---- */}
      <section className="concept-section" aria-label="Context">
        <div className="concept-section__inner container">
          <SectionReveal>
            <div className="concept-section__content">
              <h2 className="concept-section__heading">Context</h2>
              <p className="text-body-lg">{project.context}</p>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ---- 3. The Opportunity ---- */}
      <section className="concept-section" aria-label="The Opportunity">
        <div className="concept-section__inner container">
          <SectionReveal>
            <div className="concept-section__content">
              <h2 className="concept-section__heading">The Opportunity</h2>
              <p className="text-body-lg">{project.opportunity}</p>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ---- 4. The Direction ---- */}
      <section className="concept-section concept-section--surface" aria-label="The Direction">
        <div className="concept-section__inner container">
          <SectionReveal>
            <div className="concept-section__content">
              <h2 className="concept-section__heading">The Direction</h2>
              <p className="text-body-lg">{project.direction}</p>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ---- 5. Experience / Website Thinking ---- */}
      <section className="concept-section" aria-label="Experience Thinking">
        <div className="concept-section__inner container">
          <SectionReveal>
            <div className="concept-section__content">
              <h2 className="concept-section__heading">Experience Thinking</h2>
              <p className="text-body-lg">{project.experience}</p>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ---- 6. Visual Showcase (single image) ---- */}
      <section className="concept-section concept-showcase" aria-label="Visual Showcase">
        <div className="concept-section__inner container">
          <SectionReveal>
            <h2 className="concept-section__heading">Visual Direction</h2>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <div
              className={`concept-showcase__image-container ${
                project.slug === 'pulse'
                  ? 'concept-showcase__image-container--pulse'
                  : project.slug === 'arc'
                  ? 'concept-showcase__image-container--arc'
                  : ''
              }`}
            >
              <img
                src={project.heroImage}
                alt={`${project.title} — visual direction by RENSOR`}
                className="concept-showcase__image"
                loading="lazy"
              />
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ---- 7. Services ---- */}
      <section className="concept-section" aria-label="Services">
        <div className="concept-section__inner container">
          <SectionReveal>
            <div className="concept-services">
              <h2 className="concept-section__heading">Services</h2>
              <div className="concept-services__tags">
                {project.services.map((service) => (
                  <span key={service} className="concept-service-tag">
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ---- 8. Design Intent ---- */}
      <section className="concept-section" aria-label="Design Intent">
        <div className="concept-section__inner container">
          <SectionReveal>
            <div className="concept-section__content">
              <h2 className="concept-section__heading">Design Intent</h2>
              <p className="concept-intent text-body-lg">{project.intent}</p>
              <p className="concept-disclaimer text-body">
                Self-initiated concept by RENSOR. This is not a commissioned client project.
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ---- 9. RENSOR CTA ---- */}
      <section className="concept-cta" aria-label="Start your project">
        <div className="concept-cta__inner container">
          <SectionReveal>
            <div className="concept-cta__content">
              <h2 className="text-h1 concept-cta__heading">LIKE THIS DIRECTION?</h2>
              <p className="concept-cta__supporting">
                Let's build one for your business.
              </p>
              <Link
                to="/contact"
                className="btn btn-primary concept-cta__btn"
                id="concept-cta-btn"
              >
                START A PROJECT <span className="arrow">↗</span>
              </Link>
              <p className="concept-cta__subline">
                Your business doesn't need another template. It needs a digital presence built
                around what makes it different.
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>
    </motion.div>
  );
}
