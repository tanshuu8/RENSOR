import { motion } from 'framer-motion';
import Hero from '../components/home/Hero';
import Positioning from '../components/home/Positioning';
import SelectedWork from '../components/home/SelectedWork';
import Services from '../components/home/Services';
import Audience from '../components/home/Audience';
import WhyRensor from '../components/home/WhyRensor';
import Process from '../components/home/Process';
import AboutPreview from '../components/home/AboutPreview';
import FinalCTA from '../components/home/FinalCTA';

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Hero />
      <Positioning />
      <SelectedWork />
      <Services />
      <Audience />
      <WhyRensor />
      <Process />
      <AboutPreview />
      <FinalCTA />
    </motion.div>
  );
}
