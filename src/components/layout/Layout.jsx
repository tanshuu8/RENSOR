import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }) {
  const location = useLocation();

  return (
    <div className="layout">
      <Header />
      <main id="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
}
