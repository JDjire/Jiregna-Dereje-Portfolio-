import { motion } from 'framer-motion';
import { HiMoon, HiSun } from 'react-icons/hi2';

export default function ThemeToggle({ isDark, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="touch-target relative p-2 rounded-md border border-white/10 hover:border-primary/40 transition-colors flex items-center justify-center"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <motion.div
        key={isDark ? 'moon' : 'sun'}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {isDark ? (
          <HiSun className="w-5 h-5 text-primary" />
        ) : (
          <HiMoon className="w-5 h-5 text-secondary-container" />
        )}
      </motion.div>
    </button>
  );
}
