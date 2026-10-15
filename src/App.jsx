import { AnimatePresence, LazyMotion, domAnimation, m } from 'framer-motion';
import { lazy, Suspense, useEffect } from 'react';
import AmbientBackground from './components/layout/AmbientBackground';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import SEO from './components/seo/SEO';
import { GitHubProvider } from './context/GitHubContext';
import { useMousePosition } from './hooks/useMousePosition';
import { useTheme } from './hooks/useTheme';

const Hero = lazy(() => import('./components/hero/Hero'));
const About = lazy(() => import('./components/about/About'));
const Skills = lazy(() => import('./components/skills/Skills'));
const Projects = lazy(() => import('./components/projects/Projects'));
const Certificates = lazy(() => import('./components/certificates/Certificates'));
const GitHubSection = lazy(() => import('./components/github/GitHubSection'));
const Contact = lazy(() => import('./components/contact/Contact'));

function PageShell({ children }) {
  return (
    <m.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </m.main>
  );
}

export default function App() {
  const { isDark, toggleTheme } = useTheme();
  useMousePosition();

  useEffect(() => {
    document.documentElement.lang = 'en';
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <div className={isDark ? 'dark' : 'light'}>
        <SEO />
        <a
          href="#hero"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:p-4 focus:bg-primary focus:text-on-primary"
        >
          Skip to content
        </a>
        <AmbientBackground />
        <Header isDark={isDark} onToggleTheme={toggleTheme} />
        <GitHubProvider>
          <AnimatePresence mode="wait">
            <PageShell>
              <Suspense fallback={null}>
                <Hero />
                <About />
                <Skills />
                <Projects />
                <Certificates />
                <GitHubSection />
                <Contact />
              </Suspense>
            </PageShell>
          </AnimatePresence>
        </GitHubProvider>
        <Footer />
      </div>
    </LazyMotion>
  );
}
