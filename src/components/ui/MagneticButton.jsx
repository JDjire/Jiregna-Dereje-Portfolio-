import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { useBreakpoint } from '../../hooks/useMediaQuery';

const motionMap = {
  button: motion.button,
  a: motion.a,
};

export default function MagneticButton({
  children,
  className = '',
  strength = 0.35,
  as = 'button',
  ...props
}) {
  const ref = useRef(null);
  const { isTouch } = useBreakpoint();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const MotionComp = motionMap[as] || motion.button;

  const handleMove = (e) => {
    if (isTouch) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <MotionComp
      ref={ref}
      style={isTouch ? undefined : { x: springX, y: springY }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={className}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </MotionComp>
  );
}
