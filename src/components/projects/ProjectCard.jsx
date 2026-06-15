import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaGithub, FaStar } from 'react-icons/fa';
import { useBreakpoint } from '../../hooks/useMediaQuery';

export default function ProjectCard({ project, index }) {
  const { isTouch } = useBreakpoint();

  return (
    <motion.article
      className="glass-card interactive-glow overflow-hidden group flex flex-col h-full"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-24px' }}
      transition={{ delay: Math.min(index * 0.06, 0.36), duration: 0.5 }}
      whileHover={isTouch ? undefined : { y: -8 }}
    >
      <div className="relative aspect-[16/10] sm:aspect-video overflow-hidden bg-surface-container">
        <img
          src={project.thumbnail}
          alt={`${project.title} preview`}
          loading="lazy"
          decoding="async"
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-transparent to-transparent opacity-80" />
        {project.stars != null && (
          <span className="absolute top-2 right-2 sm:top-3 sm:right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-surface/80 font-mono text-[10px] sm:text-xs text-primary">
            <FaStar size={10} aria-hidden /> {project.stars}
          </span>
        )}
      </div>

      <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-1 min-w-0">
        <h3 className="font-display text-lg sm:text-xl text-white mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {project.title}
        </h3>
        <p className="text-on-surface-variant text-xs sm:text-sm mb-3 sm:mb-4 flex-1 line-clamp-3">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-5">
          {(project.tech || []).slice(0, 5).map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-mono bg-surface-container-high text-on-surface-variant border border-white/5 max-w-full truncate"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex flex-col xs:flex-row gap-2 sm:gap-3 mt-auto">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary flex-1 py-3 text-center text-xs flex items-center justify-center gap-2 touch-target"
          >
            Live <FaExternalLinkAlt size={12} aria-hidden />
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost flex-1 py-3 text-center text-xs flex items-center justify-center gap-2 touch-target"
          >
            Code <FaGithub size={14} aria-hidden />
          </a>
        </div>
      </div>
    </motion.article>
  );
}
