import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import { siteConfig } from '../../config/site';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';
import MagneticButton from '../ui/MagneticButton';
import ThemeToggle from '../ui/ThemeToggle';

export default function Header({ isDark, onToggleTheme }) {
  const [open, setOpen] = useState(false);
  useBodyScrollLock(open);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <header className="fixed top-0 w-full z-50 glass-panel border-b border-white/10 pt-safe-top">
      <div className="container-main flex justify-between items-center gap-3 py-3 sm:py-4 3xl:py-5 min-h-[3.5rem] sm:min-h-[4rem] 3xl:min-h-[5rem]">
        <a
          href="#hero"
          className="font-mono text-label-mono text-primary tracking-widest uppercase hover:text-secondary transition-colors shrink min-w-0 truncate max-w-[45vw] sm:max-w-none"
          onClick={() => setOpen(false)}
        >
          <span className="hidden xs:inline">{siteConfig.name} </span>
          <span>{siteConfig.version}</span>
        </a>

        <nav className="hidden md:flex items-center gap-3 lg:gap-4 3xl:gap-6" aria-label="Main">
          {siteConfig.nav.map((item) => (
            <MagneticButton
              key={item.href}
              as="a"
              href={item.href}
              className="btn-primary px-4 lg:px-5 3xl:px-7 py-2 3xl:py-3 whitespace-nowrap"
            >
              {item.label}
            </MagneticButton>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3 lg:gap-4 3xl:gap-6 shrink-0">
          <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
          <MagneticButton as="a" href="#contact" className="btn-primary px-4 lg:px-6 3xl:px-8 py-2 3xl:py-3 whitespace-nowrap">
            Hire Me
          </MagneticButton>
        </div>

        <div className="flex md:hidden items-center gap-2 shrink-0">
          <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
          <button
            type="button"
            className="touch-target text-primary p-2 -mr-2 flex items-center justify-center"
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen(!open)}
          >
            {open ? <HiX size={26} /> : <HiMenu size={26} />}
          </button>
        </div>
      </div>


      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              aria-label="Close menu overlay"
              onClick={() => setOpen(false)}
            />
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="md:hidden fixed top-0 right-0 z-50 h-full w-[min(100%,20rem)] glass-panel border-l border-white/10 shadow-2xl flex flex-col pt-[calc(env(safe-area-inset-top,0px)+4rem)] pb-safe-bottom"
              aria-label="Mobile"
            >
              <div className="flex flex-col gap-1 p-6 overflow-y-auto flex-1">
                {siteConfig.nav.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="btn-primary text-center py-4 touch-target"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
                <a
                  href="#contact"
                  className="btn-primary text-center py-4 mt-6 touch-target"
                  onClick={() => setOpen(false)}
                >
                  Hire Me
                </a>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
