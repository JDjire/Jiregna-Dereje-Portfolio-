import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const defaultVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0 },
};

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  as = 'div',
  id,
}) {
  const reduced = useReducedMotion();
  const Component = motion[as] || motion.div;

  if (reduced) {
    return (
      <div className={className} id={id}>
        {children}
      </div>
    );
  }

  return (
    <Component
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px', amount: 0.15 }}
      variants={defaultVariants}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </Component>
  );
}
