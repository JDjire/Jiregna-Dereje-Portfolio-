import { useMemo, useState } from 'react';
import { projectFilters } from '../../config/site';
import { useGitHubContext } from '../../context/GitHubContext';
import ScrollReveal from '../ui/ScrollReveal';
import SectionHeading from '../ui/SectionHeading';
import ProjectCard from './ProjectCard';

export default function Projects() {
  const { repos, loading, error } = useGitHubContext();
  const [filter, setFilter] = useState('all');

  const filtered = useMemo(() => {
    if (filter === 'all') return repos;
    return repos.filter((p) => p.topics?.includes(filter));
  }, [repos, filter]);

  return (
    <section id="portfolio" className="section-padding relative z-10">
      <div className="container-main">
        <ScrollReveal>
          <SectionHeading title="PROJECT'S" overline="// PORTFOLIO" />
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <div
            className="flex gap-2 mb-8 sm:mb-10 overflow-x-auto filter-scroll pb-2 -mx-1 px-1"
            role="tablist"
            aria-label="Filter projects"
          >
            {projectFilters.map((f) => (
              <button
                key={f}
                type="button"
                role="tab"
                aria-selected={filter === f}
                onClick={() => setFilter(f)}
                className={`touch-target shrink-0 px-4 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all whitespace-nowrap ${
                  filter === f
                    ? 'bg-primary-container text-on-primary-fixed shadow-[0_0_20px_rgba(0,212,255,0.3)]'
                    : 'bg-surface-container-high text-on-surface-variant hover:text-white border border-white/5'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {loading && (
          <p className="font-mono text-primary text-center py-10 sm:py-12 text-sm sm:text-base" role="status">
            Syncing GitHub repositories…
          </p>
        )}

        {error && !loading && (
          <p className="font-mono text-on-surface-variant text-center mb-6 text-xs sm:text-sm px-2">
            Using curated projects — set VITE_GITHUB_USERNAME for live data.
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6 3xl:gap-8">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {!loading && filtered.length === 0 && (
          <p className="text-center text-on-surface-variant font-mono py-10 sm:py-12 text-sm">
            No projects match this filter.
          </p>
        )}
      </div>
    </section>
  );
}
