import { memo } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import ReactIcon from '../ui/ReactIcon';
import logo from '../../../assets/images/logo.png';
import { useAppSelector } from '../../../app/hooks';
import {
  selectServices,
  selectServicesStatus,
} from '../../../store/servicesSlice';
import { useCompanyInfo } from '../../hooks/useCompanyInfo';
import type { ContactRow } from '../../hooks/useCompanyInfo';

/* Map social platform name → icon */
const PLATFORM_ICON_NAMES: Record<string, string> = {
  whatsapp: 'FaWhatsapp',
  facebook: 'FaFacebookF',
  linkedin: 'FaLinkedinIn',
  instagram: 'FaInstagram',
  tiktok: 'FaTiktok',
  youtube: 'FaYoutube',
  twitter: 'FaTwitter',
  x: 'FaTwitter',
};

function socialIconName(platform: string): string {
  const key = platform.toLowerCase();
  const match = Object.entries(PLATFORM_ICON_NAMES).find(([p]) =>
    key.includes(p)
  );
  return match?.[1] ?? 'FaGlobe';
}

/* Infer icon and href from the contact row type field */
function contactIconName(type: string): string {
  const t = type.toLowerCase();
  if (t.includes('email') || t.includes('mail')) return 'FaEnvelope';
  if (t.includes('phone') || t.includes('tel') || t.includes('mobile'))
    return 'FaPhone';
  if (t.includes('address') || t.includes('location') || t.includes('map'))
    return 'FaMapMarkerAlt';
  return 'FaClock';
}

function contactHref(row: ContactRow): string | undefined {
  if (row.link) return row.link;
  const t = row.type.toLowerCase();
  if (t.includes('email') || t.includes('mail')) return `mailto:${row.value}`;
  if (t.includes('phone') || t.includes('tel') || t.includes('mobile'))
    return `tel:${row.value.replace(/[\s\-()]/g, '')}`;
  if (t.includes('address') || t.includes('location') || t.includes('map'))
    return row.value.startsWith('http') ? row.value : undefined;
  if (t.includes('whatsapp'))
    return `https://wa.me/${row.value.replace(/\D/g, '')}`;
  return undefined;
}

const companyLinks = [
  { title: 'About Us', link: '/about-us' },
  { title: 'Insights', link: '/services/all' },
  { title: 'Contact', link: '/contact-us' },
];

const Footer = () => {
  const services = useAppSelector(selectServices);
  const status = useAppSelector(selectServicesStatus);
  const isLoading = status === 'idle' || status === 'loading';

  const info = useCompanyInfo();

  const serviceLinks = services.map((s) => ({
    title: s.service_name,
    link: `/services/${s.slug}`,
  }));

  return (
    <footer className="relative bg-footer-bg text-muted">
      {/* gradient fade from page into footer */}
      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-canvas to-transparent pointer-events-none" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-7xl mx-auto px-6 lg:px-10 py-16"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="flex flex-col items-center sm:items-start gap-5">
            <Link to="/">
              <img
                src={info.logo_url || logo}
                alt={info.name}
                className="h-10 w-auto object-contain"
                loading="lazy"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = logo;
                }}
              />
            </Link>
            <p className="text-sm leading-relaxed text-muted max-w-xs text-center sm:text-left">
              {info.description}
            </p>
            <div className="flex items-center justify-center sm:justify-start gap-3 pt-1 flex-wrap">
              {info.social_links.map(({ platform, url }) => {
                return (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={platform}
                    className="w-8 h-8 flex items-center justify-center rounded
                      bg-glass-bg text-muted hover:bg-glass-hover hover:text-accent
                      transition-all duration-200 text-sm border border-glass-rim hover:border-accent/30"
                  >
                    <ReactIcon name={socialIconName(platform)} size={14} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Services */}
          <div className="flex flex-col items-center sm:items-start gap-4">
            <h4 className="text-xs font-semibold font-display tracking-widest uppercase text-fg">
              Services
            </h4>
            <ul className="flex flex-col items-center sm:items-start gap-2.5">
              {isLoading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <li
                      key={i}
                      className="h-4 w-24 bg-white/10 rounded animate-pulse"
                    />
                  ))
                : serviceLinks.map((s) => (
                    <li key={s.link}>
                      <Link
                        to={s.link}
                        className="text-sm text-muted hover:text-accent transition-colors duration-200"
                      >
                        {s.title}
                      </Link>
                    </li>
                  ))}
            </ul>
          </div>

          {/* Company */}
          <div className="flex flex-col items-center sm:items-start gap-4">
            <h4 className="text-xs font-semibold font-display tracking-widest uppercase text-fg">
              Company
            </h4>
            <ul className="flex flex-col items-center sm:items-start gap-2.5">
              {companyLinks.map(({ title, link }) => (
                <li key={link}>
                  <Link
                    to={link}
                    className="text-sm text-muted hover:text-accent transition-colors duration-200"
                  >
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center sm:items-start gap-4">
            <h4 className="text-xs font-semibold font-display tracking-widest uppercase text-fg">
              Contact
            </h4>
            <ul className="flex flex-col items-center sm:items-start gap-3">
              {info.contact_rows.map((row) => {
                const href = contactHref(row);
                return (
                  <li
                    key={row.type + row.value}
                    className="flex items-start gap-3"
                  >
                    <ReactIcon
                      name={contactIconName(row.type)}
                      size={13}
                      className="text-muted mt-0.5 shrink-0"
                    />
                    {href ? (
                      <a
                        href={href}
                        className="text-sm text-muted hover:text-accent transition-colors duration-200 leading-snug"
                      >
                        {row.value}
                      </a>
                    ) : (
                      <span className="text-sm text-muted leading-snug">
                        {row.value}
                      </span>
                    )}
                  </li>
                );
              })}
              {info.available_hours && (
                <li className="flex items-start gap-3">
                  <ReactIcon
                    name="FaClock"
                    size={13}
                    className="text-muted mt-0.5 shrink-0"
                  />
                  <span className="text-sm text-muted leading-snug">
                    {info.available_hours}
                  </span>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-glass-rim flex justify-center">
          <p className="text-xs text-muted text-center">
            &copy; {new Date().getFullYear()} {info.name}. All rights reserved.
          </p>
        </div>
      </motion.div>
    </footer>
  );
};

export default memo(Footer);
