import { motion } from 'framer-motion';
import { FaCodeBranch, FaGithub, FaStar, FaUsers } from 'react-icons/fa';
import { useGitHubContext } from '../../context/GitHubContext';
import { useBreakpoint } from '../../hooks/useMediaQuery';
import ScrollReveal from '../ui/ScrollReveal';
import SectionHeading from '../ui/SectionHeading';
import ContributionGraph from './ContributionGraph';

const statCards = [
  { key: 'repos', label: 'Public Repos', icon: FaGithub },
  { key: 'privateRepos', label: 'Private Repos', icon: FaGithub },
  { key: 'stars', label: 'Total Stars', icon: FaStar },
  { key: 'followers', label: 'Followers', icon: FaUsers },
  { key: 'following', label: 'Following', icon: FaCodeBranch },
];

export default function GitHubSection() {
  const { stats, user, username, loading } = useGitHubContext();
  const { isTouch } = useBreakpoint();
  const profileUrl = user?.html_url || (username ? `https://github.com/${username}` : '#');

  return (
    <section id="github" className="section-padding relative z-10 bg-surface-container-lowest/50">
      <div className="container-main">
        <ScrollReveal>
          <SectionHeading title="GITHUB" overline="// LIVE DATA" />
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-10">
          {statCards.map(({ key, label, icon: Icon }, i) => (
            <ScrollReveal key={key} delay={i * 0.05}>
              <motion.div
                className="glass-card p-4 sm:p-5 md:p-6 text-center h-full flex flex-col items-center justify-center"
                whileHover={isTouch ? undefined : { scale: 1.02 }}
              >
                <Icon className="mb-2 sm:mb-3 text-primary w-5 h-5 sm:w-6 sm:h-6" aria-hidden />
                <div className="text-2xl sm:text-3xl font-display text-primary mb-1 tabular-nums">
                  {loading ? '—' : (stats[key]?.toLocaleString?.() ?? stats[key])}
                </div>
                <p className="font-mono text-[10px] sm:text-xs text-on-surface-variant uppercase leading-tight px-1">
                  {label}
                </p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.1}>
          <ContributionGraph />
        </ScrollReveal>

        <div className="mt-6 sm:mt-8 text-center px-2">
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 w-full sm:w-auto max-w-xs sm:max-w-none mx-auto touch-target"
          >
            <FaGithub aria-hidden /> View GitHub Profile
          </a>
        </div>
      </div>
    </section>
  );
}
