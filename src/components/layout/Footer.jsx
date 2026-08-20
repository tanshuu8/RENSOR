import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__inner container">
        {/* Top Horizontal Divider separating CTA & Footer */}
        <div className="footer__divider footer__divider--top" aria-hidden="true"></div>

        <div className="footer__top">
          {/* Left Column: Brand & Tagline */}
          <div className="footer__brand">
            <Link to="/" className="footer__brand-title" aria-label="RENSOR — Home">
              RENSOR
            </Link>
            <p className="footer__tagline">
              Digital Design &amp; Development Studio
            </p>
          </div>

          {/* Center Column: Iconic Three-Blade Logo Mark */}
          <div className="footer__center-mark" aria-hidden="true">
            <img
              src="/images/logo-mark.png"
              alt="RENSOR Logo Mark"
              className="footer__mark-img"
              loading="lazy"
            />
          </div>

          {/* Right Column: Navigation & Connect */}
          <nav className="footer__nav" aria-label="Footer navigation">
            <div className="footer__nav-group">
              <span className="footer__nav-heading">NAVIGATE</span>
              <Link to="/work" className="footer__nav-link">Work</Link>
              <Link to="/services" className="footer__nav-link">Services</Link>
              <Link to="/about" className="footer__nav-link">About</Link>
              <Link to="/process" className="footer__nav-link">Process</Link>
            </div>

            <div className="footer__nav-group">
              <span className="footer__nav-heading">CONNECT</span>
              <a
                href="https://instagram.com/rensor"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__nav-link"
              >
                Instagram
              </a>
              <a
                href="https://linkedin.com/company/rensor"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__nav-link"
              >
                LinkedIn
              </a>
              <a href="mailto:rensor.studio@gmail.com" className="footer__nav-link">
                rensor.studio@gmail.com
              </a>
            </div>
          </nav>
        </div>

        {/* Subtle Horizontal Divider */}
        <div className="footer__divider" aria-hidden="true"></div>

        {/* Bottom Copyright & Agency Signature Row */}
        <div className="footer__bottom">
          <p className="footer__copyright">
            © {currentYear} RENSOR. All rights reserved.
          </p>
          <div className="footer__signature">
            <span>DESIGN</span>
            <span className="footer__signature-sep">/</span>
            <span>DEVELOP</span>
            <span className="footer__signature-sep">/</span>
            <span>CREATE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
