import { motion } from 'framer-motion';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { siteConfig } from '../../config/site';
import ScrollReveal from '../ui/ScrollReveal';
import SectionHeading from '../ui/SectionHeading';

export default function About() {
  return (
    <section id="about" className="section-padding relative z-10">
      <div className="container-main">
        <ScrollReveal>
          <SectionHeading title="ABOUT" overline="// ABOUT" />
        </ScrollReveal>

        {/* Responsive grid: single column on mobile, 12-col on tablet+ */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5 md:gap-6 3xl:gap-8">
          {/* About text card — takes 8/12 cols on md+ */}
          <ScrollReveal className="glass-card interactive-glow col-span-1 md:col-span-8 p-5 sm:p-6 md:p-8 3xl:p-10 relative group">
            <h3 className="font-mono text-label-mono text-secondary mb-3 sm:mb-4 uppercase tracking-widest">
              About_Me.md
            </h3>
            <p className="text-body-lg text-on-surface-variant mb-5 sm:mb-6 leading-relaxed">
              I am a full-stack engineer specializing in high-performance web applications and
              cinematic user interfaces. Bridging robust backend architecture with cutting-edge
              frontend experiences, I build digital products that are as reliable as they are
              visually striking.
            </p>
            <div className="flex items-center gap-2 text-primary flex-wrap">
              <FaMapMarkerAlt className="shrink-0" aria-hidden />
              <span className="font-mono text-label-mono">{siteConfig.location}</span>
            </div>
          </ScrollReveal>

          {/* Stats card — takes 4/12 cols on md+ */}
          <ScrollReveal
            delay={0.1}
            className="glass-card interactive-glow col-span-1 md:col-span-4 p-6 sm:p-8 3xl:p-10 flex flex-col justify-center items-center text-center group min-h-[10rem] md:min-h-0"
          >
            <motion.div
              className="text-4xl sm:text-5xl lg:text-6xl 3xl:text-7xl font-display text-primary mb-2"
              whileHover={{ scale: 1.05 }}
            >
              3+
            </motion.div>
            <p className="font-mono text-label-mono text-on-surface-variant uppercase max-w-[12rem]">
              Years Building Full-Stack Apps
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
