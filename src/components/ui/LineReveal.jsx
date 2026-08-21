import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

/**
 * LineReveal — Subtle, editorial line-by-line upward reveal for major headings.
 * Splits text by explicit lines or line breaks, rendering each line inside an overflow-hidden mask.
 */
export default function LineReveal({
  lines,
  as: Component = 'h2',
  className = '',
  delay = 0,
  stagger = 0.08,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px 0px' });
  const shouldReduceMotion = useReducedMotion();

  const lineVariants = {
    hidden: {
      y: shouldReduceMotion ? 0 : '100%',
      opacity: shouldReduceMotion ? 0 : 0.85,
    },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0.2 : 0.65,
        delay: shouldReduceMotion ? 0 : delay + i * stagger,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  return (
    <Component ref={ref} className={className}>
      {lines.map((line, index) => (
        <span
          key={index}
          style={{ display: 'block', overflow: 'hidden', verticalAlign: 'top' }}
        >
          <motion.span
            style={{ display: 'block', willChange: 'transform' }}
            custom={index}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={lineVariants}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Component>
  );
}
