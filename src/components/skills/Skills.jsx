import { motion } from 'framer-motion';
import {
  SiCss,
  SiExpress,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiNodedotjs,
  SiReact,
  SiTailwindcss,
} from 'react-icons/si';
import { skills } from '../../config/site';
import { useBreakpoint } from '../../hooks/useMediaQuery';
import ScrollReveal from '../ui/ScrollReveal';
import SectionHeading from '../ui/SectionHeading';

const iconMap = {
  html: SiHtml5,
  css: SiCss,
  javascript: SiJavascript,
  react: SiReact,
  tailwind: SiTailwindcss,
  git: SiGit,
  github: SiGithub,
  nodejs: SiNodedotjs,
  express: SiExpress,
  mongodb: SiMongodb,
};

function SkillCard({ skill, index }) {
  const { isTouch } = useBreakpoint();
  const Icon = iconMap[skill.icon] || SiJavascript;
  const isPrimary = skill.color === 'primary';

  return (
    <motion.article
      className="glass-card interactive-glow p-4 sm:p-5 md:p-6 group h-full"
      whileHover={isTouch ? undefined : { y: -6 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-24px' }}
      transition={{ delay: Math.min(index * 0.04, 0.4), duration: 0.45 }}
    >
      <div className="flex items-start justify-between mb-3 sm:mb-4 gap-2">
        <div
          className={`p-2.5 sm:p-3 rounded-lg shrink-0 ${isPrimary ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'}`}
        >
          <Icon className="w-6 h-6 sm:w-7 sm:h-7" aria-hidden />
        </div>
        <span
          className={`font-mono text-label-mono shrink-0 ${isPrimary ? 'text-primary' : 'text-secondary'}`}
        >
          {skill.level}%
        </span>
      </div>
      <h3 className="font-mono text-sm sm:text-base text-white mb-2 sm:mb-3 group-hover:text-primary transition-colors truncate">
        {skill.name}
      </h3>
      <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
        <motion.div
          className={`h-full progress-fill ${isPrimary ? 'bg-primary-container' : 'bg-secondary'}`}
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.15 + index * 0.04, ease: 'easeOut' }}
          style={{
            boxShadow: isPrimary
              ? '0 0 10px rgba(0,212,255,0.5)'
              : '0 0 10px rgba(208,188,255,0.4)',
          }}
        />
      </div>
    </motion.article>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="section-padding relative z-10">
      <div className="container-main">
        <ScrollReveal>
          <SectionHeading title="SKILLS" overline="// SKILLS" />
        </ScrollReveal>

        <div className="grid grid-cols-2 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 3xl:grid-cols-6 gap-3 sm:gap-4 md:gap-5 3xl:gap-6">
          {skills.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

