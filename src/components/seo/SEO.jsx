import { Helmet } from 'react-helmet-async';
import { siteConfig } from '../../config/site';

export default function SEO() {
  const url = typeof window !== 'undefined' ? window.location.origin : '';
  const title = siteConfig.title;
  const description = siteConfig.description;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="author" content={siteConfig.author} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: siteConfig.author,
          url,
          jobTitle: 'Full-Stack Developer',
          sameAs: Object.values(siteConfig.social),
        })}
      </script>
    </Helmet>
  );
}
