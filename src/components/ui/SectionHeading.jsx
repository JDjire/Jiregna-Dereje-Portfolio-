export default function SectionHeading({ overline, title, highlight }) {
  return (
    <div className="mb-10 sm:mb-12 md:mb-16">
      {overline && (
        <p className="font-mono text-label-mono text-primary uppercase tracking-widest mb-2">
          {overline}
        </p>
      )}
      <h2 className="font-display text-headline text-white light:text-slate-900 mb-3 sm:mb-4 text-balance">
        {title}
        {highlight && <span className="text-primary">.{highlight}</span>}
      </h2>
      <div className="h-1 w-16 sm:w-24 bg-gradient-to-r from-primary-container to-transparent" />
    </div>
  );
}
