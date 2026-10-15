import { FaExternalLinkAlt, FaFilePdf } from 'react-icons/fa';
import { certificates } from '../../config/site';
import ScrollReveal from '../ui/ScrollReveal';
import SectionHeading from '../ui/SectionHeading';

function CertificateCard({ certificate, index }) {
  return (
    <ScrollReveal delay={Math.min(index * 0.05, 0.3)} className="h-full">
      <article className="glass-card interactive-glow overflow-hidden flex flex-col h-full group">
        <div className="relative aspect-[16/10] overflow-hidden bg-surface-container">
          <iframe
            src={`${certificate.file}#toolbar=0&navpanes=0&scrollbar=0`}
            title={`${certificate.title} preview`}
            loading="lazy"
            className="w-full h-full bg-white pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-container/80 via-transparent to-transparent pointer-events-none" />
        </div>

        <div className="p-5 sm:p-6 flex flex-col flex-1">
          <div className="flex items-start justify-between gap-4 mb-5">
          <div className="p-3 rounded-lg bg-primary/10 text-primary shrink-0">
            <FaFilePdf className="w-6 h-6" aria-hidden />
          </div>
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-secondary text-right">
            {certificate.issuer}
          </span>
          </div>

          <h3 className="font-display text-lg sm:text-xl text-white mb-3 group-hover:text-primary transition-colors">
            {certificate.title}
          </h3>
          <p className="text-on-surface-variant text-xs sm:text-sm leading-relaxed flex-1 mb-5">
            {certificate.description}
          </p>

          <a
            href={certificate.file}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full py-3 text-center text-xs flex items-center justify-center gap-2 touch-target"
          >
            View Certificate <FaExternalLinkAlt size={11} aria-hidden />
          </a>
        </div>
      </article>
    </ScrollReveal>
  );
}

export default function Certificates() {
  return (
    <section id="certificates" className="section-padding relative z-10">
      <div className="container-main">
        <ScrollReveal>
          <SectionHeading title="CERTIFICATES" overline="// ACHIEVEMENTS" />
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {certificates.map((certificate, index) => (
            <CertificateCard key={certificate.id} certificate={certificate} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
