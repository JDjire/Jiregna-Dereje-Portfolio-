import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaGithub, FaInstagram, FaLinkedin, FaTelegramPlane, FaTwitter } from 'react-icons/fa';
import { siteConfig } from '../../config/site';
import { handleSocialClick } from '../../utils/socialLinks';
import { validateContactForm } from '../../utils/validators';
import MagneticButton from '../ui/MagneticButton';
import ScrollReveal from '../ui/ScrollReveal';
import SectionHeading from '../ui/SectionHeading';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const FORMSPREE = import.meta.env.VITE_FORMSPREE_ENDPOINT;

const initial = { name: '', email: '', subject: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((err) => ({ ...err, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { valid, errors: validationErrors } = validateContactForm(form);
    if (!valid) {
      setErrors(validationErrors);
      return;
    }

    setStatus('sending');

    try {
      if (SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY) {
        await emailjs.send(
          SERVICE_ID,
          TEMPLATE_ID,
          {
            from_name: form.name,
            reply_to: form.email,
            subject: form.subject,
            message: form.message,
          },
          PUBLIC_KEY
        );
      } else if (FORMSPREE) {
        const res = await fetch(FORMSPREE, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error('Formspree error');
      } else {
        await new Promise((r) => setTimeout(r, 800));
        console.info('Demo submit:', form);
      }

      setStatus('success');
      setForm(initial);
    } catch {
      setStatus('error');
    }
  };

  const inputClass = (field) =>
    `w-full px-4 py-3.5 sm:py-3 min-h-[2.75rem] rounded-md bg-surface-container/60 border font-mono text-base sm:text-sm transition-all outline-none ${
      errors[field]
        ? 'border-error'
        : 'border-white/10 focus:border-primary focus:shadow-[0_0_15px_rgba(0,212,255,0.15)]'
    }`;

  return (
    <section id="contact" className="section-padding relative z-10">
      <div className="container-main">
        <ScrollReveal>
          <SectionHeading title="OPEN" highlight="CHANNEL" overline="// CONTACT" />
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 3xl:gap-14">
          <ScrollReveal>
            <div className="glass-card p-5 sm:p-6 md:p-8 3xl:p-12">
              <p className="text-on-surface-variant text-sm sm:text-base mb-6 sm:mb-8 leading-relaxed">
                Ready to build something exceptional? Send a message — I typically respond within
                24 hours.
              </p>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                <MagneticButton
                  as="a"
                  href={siteConfig.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => handleSocialClick(e, siteConfig.social.github)}
                  className="touch-target p-3 rounded-lg glass-panel hover:text-primary transition-colors flex items-center justify-center"
                  aria-label="GitHub"
                >
                  <FaGithub size={22} />
                </MagneticButton>
                <MagneticButton
                  as="a"
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => handleSocialClick(e, siteConfig.social.linkedin)}
                  className="touch-target p-3 rounded-lg glass-panel hover:text-primary transition-colors flex items-center justify-center"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin size={22} />
                </MagneticButton>
                <MagneticButton
                  as="a"
                  href={siteConfig.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => handleSocialClick(e, siteConfig.social.twitter)}
                  className="touch-target p-3 rounded-lg glass-panel hover:text-primary transition-colors flex items-center justify-center"
                  aria-label="Twitter / X"
                >
                  <FaTwitter size={22} />
                </MagneticButton>
                <MagneticButton
                  as="a"
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => handleSocialClick(e, siteConfig.social.instagram)}
                  className="touch-target p-3 rounded-lg glass-panel hover:text-primary transition-colors flex items-center justify-center"
                  aria-label="Instagram"
                >
                  <FaInstagram size={22} />
                </MagneticButton>
                <MagneticButton
                  as="a"
                  href={siteConfig.social.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => handleSocialClick(e, siteConfig.social.telegram)}
                  className="touch-target p-3 rounded-lg glass-panel hover:text-primary transition-colors flex items-center justify-center"
                  aria-label="Telegram"
                >
                  <FaTelegramPlane size={22} />
                </MagneticButton>
              </div>
              <p className="mt-6 sm:mt-8 font-mono text-label-mono text-primary break-all">
                {siteConfig.email} <br />
                Phone: +251 905 275 720
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <form
              onSubmit={handleSubmit}
              className="glass-card p-5 sm:p-6 md:p-8 3xl:p-12 space-y-4 sm:space-y-5"
              noValidate
              aria-label="Contact form"
            >
              {['name', 'email', 'subject'].map((field) => (
                <div key={field}>
                  <label htmlFor={field} className="font-mono text-xs uppercase text-on-surface-variant mb-2 block">
                    {field}
                  </label>
                  <input
                    id={field}
                    name={field}
                    type={field === 'email' ? 'email' : 'text'}
                    value={form[field]}
                    onChange={handleChange}
                    className={inputClass(field)}
                    autoComplete={field === 'email' ? 'email' : field === 'name' ? 'name' : 'off'}
                    aria-invalid={!!errors[field]}
                    aria-describedby={errors[field] ? `${field}-error` : undefined}
                  />
                  {errors[field] && (
                    <p id={`${field}-error`} className="text-error text-xs mt-1 font-mono">
                      {errors[field]}
                    </p>
                  )}
                </div>
              ))}

              <div>
                <label htmlFor="message" className="font-mono text-xs uppercase text-on-surface-variant mb-2 block">
                  message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  className={inputClass('message')}
                  aria-invalid={!!errors.message}
                />
                {errors.message && (
                  <p className="text-error text-xs mt-1 font-mono">{errors.message}</p>
                )}
              </div>

              <MagneticButton
                type="submit"
                className="btn-primary w-full py-4 disabled:opacity-60"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? 'Transmitting…' : 'Send Message'}
              </MagneticButton>

              {status === 'success' && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-primary font-mono text-sm text-center"
                  role="status"
                >
                  Message sent successfully.
                </motion.p>
              )}
              {status === 'error' && (
                <p className="text-error font-mono text-sm text-center" role="alert">
                  Failed to send. Check EmailJS / Formspree configuration.
                </p>
              )}
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
