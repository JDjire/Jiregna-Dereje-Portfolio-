import { motion } from 'framer-motion';
import { lazy, Suspense } from 'react';
import { siteConfig } from '../../config/site';
import { useBreakpoint } from '../../hooks/useMediaQuery';
import MagneticButton from '../ui/MagneticButton';
import TypingText from './TypingText';

const GalaxyScene = lazy(() => import('./GalaxyScene'));

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

export default function Hero() {
  const { isMobile } = useBreakpoint();

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex items-center justify-center pt-[calc(4.5rem+env(safe-area-inset-top,0px))] pb-16 sm:pb-20 md:pb-24 overflow-hidden w-full"
      aria-labelledby="hero-heading"
    >
      <Suspense fallback={null}>
        <GalaxyScene />
      </Suspense>

      <motion.div
        className="container-main text-center z-10 w-full"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.h1
          id="hero-heading"
          variants={item}
          className="font-display text-display-fluid text-white mb-4 sm:mb-6 tracking-tight text-balance px-1"
        >
          I WILL CHANGE YOUR{' '}
          <span className="block sm:inline">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              IDEA TO REALITY
            </span>
          </span>
        </motion.h1>

        <motion.div
          variants={item}
          className="min-h-[3rem] sm:min-h-[3.5rem] mb-8 sm:mb-10 flex justify-center px-2 w-full"
        >
          <TypingText />
        </motion.div>

        {/* CTA Buttons — stack on mobile, row on tablet+ */}
        <motion.div
          variants={item}
          className="flex flex-col xs:flex-row items-stretch xs:items-center justify-center gap-3 sm:gap-4 w-full max-w-sm xs:max-w-none mx-auto px-4 xs:px-2 sm:px-0"
        >
          <MagneticButton
            as="a"
            href="#portfolio"
            className="btn-primary w-full xs:w-auto px-6 sm:px-8 md:px-10 py-3.5 sm:py-4 flex items-center justify-center"
          >
            View Projects
          </MagneticButton>
          <MagneticButton
            as="a"
            href={siteConfig.resumeUrl}
            className="btn-ghost w-full xs:w-auto px-6 sm:px-8 md:px-10 py-3.5 sm:py-4 flex items-center justify-center gap-2"
            download
          >
            <span className="truncate">Download Resume</span>
          </MagneticButton>
        </motion.div>

        {/* Profile Picture */}
        <motion.div
          variants={item}
          className="flex justify-center mt-8 sm:mt-10 md:mt-12"
        >
          <div className="relative group w-32 h-32 xs:w-36 xs:h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 lg:w-56 lg:h-56 3xl:w-64 3xl:h-64 rounded-full overflow-hidden border-4 border-primary/20 shadow-[0_0_30px_rgba(0,212,255,0.2)]">
            <img
              src="https://jdjire.github.io/jiregna-portfolio/assets/Screenshot_20250202_164718_Photo%20Editor.jpg"
              alt="Jiregna Dereje"
              className="w-full h-full object-cover object-center transition-opacity duration-700 ease-in-out group-hover:opacity-0 absolute inset-0"
            />
            <img
              src="https://jdjire.github.io/jiregna-portfolio/assets/Screenshot_20250421_112742_Gallery.jpg"
              alt="Jiregna Dereje Alternate"
              className="w-full h-full object-cover object-center transition-opacity duration-700 ease-in-out opacity-0 group-hover:opacity-100 absolute inset-0"
            />
          </div>
        </motion.div>
      </motion.div>

      {!isMobile && (
        <motion.div
          className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 hidden sm:block"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          aria-hidden
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2">
            <div className="w-1 h-2 bg-primary rounded-full" />
          </div>
        </motion.div>
      )}
    </section>
  );
}
