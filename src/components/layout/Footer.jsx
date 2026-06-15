import { FaEnvelope, FaGithub, FaInstagram, FaLinkedin, FaTelegramPlane, FaTwitter } from 'react-icons/fa';
import { siteConfig } from '../../config/site';
import { handleSocialClick } from '../../utils/socialLinks';
import MagneticButton from '../ui/MagneticButton';

const icons = [
  { Icon: FaGithub, href: siteConfig.social.github, label: 'GitHub' },
  { Icon: FaLinkedin, href: siteConfig.social.linkedin, label: 'LinkedIn' },
  { Icon: FaTwitter, href: siteConfig.social.twitter, label: 'Twitter' },
  { Icon: FaInstagram, href: siteConfig.social.instagram, label: 'Instagram' },
  { Icon: FaTelegramPlane, href: siteConfig.social.telegram, label: 'Telegram' },
  { Icon: FaEnvelope, href: siteConfig.social.email, label: 'Email' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-surface-container-lowest border-t border-white/5 py-10 sm:py-12 3xl:py-16 relative z-10 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))]">
      <div className="container-main flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
        <p className="font-mono text-primary text-xs sm:text-sm 3xl:text-base max-w-md leading-relaxed">
          © {year} {siteConfig.name}. ENGINEERED FOR PERFORMANCE.
        </p>
        <div className="flex gap-5 sm:gap-6 3xl:gap-8">
          {icons.map(({ Icon, href, label }) => (
            <MagneticButton
              as="a"
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => handleSocialClick(e, href)}
              className="text-on-surface-variant hover:text-primary transition-colors touch-target flex items-center justify-center p-1"
              aria-label={label}
            >
              <Icon size={22} className="3xl:w-7 3xl:h-7" />
            </MagneticButton>
          ))}
        </div>
      </div>
    </footer>
  );
}
