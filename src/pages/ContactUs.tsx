import React, { memo, Suspense, lazy } from 'react';
import { motion } from 'motion/react';
import {
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock, FaGlobe,
  FaWhatsapp, FaFacebookF, FaLinkedinIn, FaInstagram,
  FaTiktok, FaYoutube, FaTwitter, FaExternalLinkAlt,
} from 'react-icons/fa';
import type { IconType } from 'react-icons';
import Page from '../components/resuable/Page';
import { useCompanyInfo } from '../shared/hooks/useCompanyInfo';
import type { ContactRow, SocialLink } from '../shared/hooks/useCompanyInfo';

const Globe = lazy(() => import('../features/contact/components/Globe'));

/* ── icon helpers ── */
function contactIcon(type: string): IconType {
  const t = type.toLowerCase();
  if (t.includes('email') || t.includes('mail'))                            return FaEnvelope;
  if (t.includes('phone') || t.includes('tel') || t.includes('mobile'))    return FaPhone;
  if (t.includes('address') || t.includes('location') || t.includes('map')) return FaMapMarkerAlt;
  if (t.includes('whatsapp'))                                                return FaWhatsapp;
  return FaClock;
}

const SOCIAL_ICONS: [string, IconType][] = [
  ['whatsapp',  FaWhatsapp],
  ['facebook',  FaFacebookF],
  ['linkedin',  FaLinkedinIn],
  ['instagram', FaInstagram],
  ['tiktok',    FaTiktok],
  ['youtube',   FaYoutube],
  ['twitter',   FaTwitter],
  ['x',         FaTwitter],
];
function socialIcon(platform: string): IconType {
  const key = platform.toLowerCase();
  return SOCIAL_ICONS.find(([p]) => key.includes(p))?.[1] ?? FaGlobe;
}

function cardHref(row: ContactRow): string | undefined {
  if (row.link && !row.link.includes('maps/embed')) return row.link;
  const t = row.type.toLowerCase();
  if (t.includes('email') || t.includes('mail'))   return `mailto:${row.value}`;
  if (t.includes('phone') || t.includes('tel') || t.includes('mobile'))
    return `tel:${row.value.replace(/[\s\-()]/g, '')}`;
  if (t.includes('whatsapp')) return `https://wa.me/${row.value.replace(/\D/g, '')}`;
  if (t.includes('address') || t.includes('location'))
    return `https://maps.google.com/search?q=${encodeURIComponent(row.value)}`;
  return undefined;
}

/* ── Contact card ── */
const ContactCard = memo(({ row, index }: { row: ContactRow; index: number }) => {
  const Icon = contactIcon(row.type);
  const href = cardHref(row);

  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300"
      style={{
        backgroundColor: 'var(--glass-bg-raised)',
        border: '1px solid var(--glass-border)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
        style={{ backgroundColor: 'var(--accent-soft)' }}
      >
        <Icon size={16} style={{ color: 'var(--accent)' }} />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-semibold tracking-widest uppercase mb-0.5"
           style={{ color: 'var(--text-muted)' }}>
          {row.title}
        </p>
        {href ? (
          <a
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="text-sm font-medium truncate block transition-colors duration-200"
            style={{ color: 'var(--text-primary)' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-primary)')}
          >
            {row.value}
          </a>
        ) : (
          <p className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>
            {row.value}
          </p>
        )}
      </div>
    </motion.div>
  );
});
ContactCard.displayName = 'ContactCard';

/* ── Social pill ── */
const SocialPill = memo(({ link, index }: { link: SocialLink; index: number }) => {
  const Icon = socialIcon(link.platform);
  return (
    <motion.a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={link.platform}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="w-9 h-9 flex items-center justify-center rounded-xl transition-colors duration-200"
      style={{
        backgroundColor: 'var(--glass-bg-raised)',
        border: '1px solid var(--glass-border)',
        color: 'var(--text-muted)',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--accent)';
        (e.currentTarget as HTMLElement).style.color = '#fff';
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--glass-bg-raised)';
        (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)';
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--glass-border)';
      }}
    >
      <Icon size={14} />
    </motion.a>
  );
});
SocialPill.displayName = 'SocialPill';

/* ── Map card (reused on desktop right panel + mobile) ── */
const MapCard = memo(({ addressRow, mapEmbedUrl, delay = 0.5 }: {
  addressRow?: ContactRow;
  mapEmbedUrl: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    className="rounded-2xl overflow-hidden"
    style={{ border: '1px solid var(--glass-border)' }}
  >
    <div
      className="flex items-center justify-between px-4 py-2.5"
      style={{ backgroundColor: 'var(--glass-bg-raised)', borderBottom: '1px solid var(--glass-border)' }}
    >
      <div className="flex items-center gap-2">
        <FaMapMarkerAlt size={11} style={{ color: 'var(--accent)' }} />
        <span className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>
          {addressRow?.value ?? 'Our Location'}
        </span>
      </div>
      <a
        href={`https://maps.google.com/search?q=${encodeURIComponent(addressRow?.value ?? '')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 text-[10px] font-medium transition-colors duration-200"
        style={{ color: 'var(--text-muted)' }}
        onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
        onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
      >
        Open in Maps <FaExternalLinkAlt size={9} />
      </a>
    </div>
    <iframe
      src={mapEmbedUrl}
      width="100%"
      height="200"
      style={{ border: 0, display: 'block' }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="Our Location"
    />
  </motion.div>
));
MapCard.displayName = 'MapCard';

/* ── Page ── */
const ContactUs: React.FC = memo(() => {
  const info = useCompanyInfo();

  const addressRow = info.contact_rows.find(r =>
    r.type.toLowerCase().includes('address') || r.type.toLowerCase().includes('location')
  );
  const mapEmbedUrl = addressRow?.link?.includes('maps/embed')
    ? addressRow.link.replace(/[\r\n\s]+/g, '')
    : null;

  const hoursRow = info.contact_rows.find(r => r.type.toLowerCase().includes('hours'));
  const availableHours = info.available_hours || hoursRow?.value;
  const displayRows = info.contact_rows.filter(r => !r.type.toLowerCase().includes('hours'));

  return (
    <Page HeadProps={{ title: 'Contact Us' }}>
      {/* ── Hero section ── */}
      <section
        className="lg:h-screen flex items-start lg:items-center px-6 lg:px-16 lg:overflow-hidden"
        style={{ paddingTop: 'calc(57px + 2rem)', paddingBottom: '2rem' }}
      >
        <div className="max-w-7xl w-full lg:h-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 lg:items-center">

          {/* ── Left: contact info ── */}
          <div className="flex flex-col gap-5 lg:gap-6 lg:h-full lg:overflow-y-auto lg:pr-1">
            <div>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.05 }}
                className="text-[10px] font-semibold tracking-[0.35em] uppercase block mb-4"
                style={{ color: 'var(--accent)' }}
              >
                Get In Touch
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold leading-tight mb-4"
                style={{ color: 'var(--text-primary)', fontFamily: '"Syne", sans-serif' }}
              >
                {info.name}
              </motion.h1>

              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '3rem' }}
                transition={{ delay: 0.4, duration: 0.5, ease: 'easeOut' }}
                className="h-1 rounded-full mb-5"
                style={{ backgroundColor: 'var(--accent)' }}
              />

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25, duration: 0.6 }}
                className="text-sm md:text-base leading-relaxed max-w-md"
                style={{ color: 'var(--text-muted)' }}
              >
                {info.description}
              </motion.p>
            </div>

            {/* Contact cards — 1-col on mobile, 2-col on sm+ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {displayRows.map((row, i) => (
                <ContactCard key={row.type + row.value} row={row} index={i} />
              ))}

              {availableHours && (
                <motion.div
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + displayRows.length * 0.08 }}
                  className="col-span-1 sm:col-span-2 flex items-center gap-4 px-5 py-4 rounded-2xl"
                  style={{
                    backgroundColor: 'var(--glass-bg-raised)',
                    border: '1px solid var(--glass-border)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                       style={{ backgroundColor: 'var(--accent-soft)' }}>
                    <FaClock size={16} style={{ color: 'var(--accent)' }} />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold tracking-widest uppercase mb-0.5"
                       style={{ color: 'var(--text-muted)' }}>
                      Available Hours
                    </p>
                    <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                      {availableHours}
                    </p>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Social links */}
            {info.social_links.length > 0 && (
              <div className="flex flex-wrap gap-2.5">
                {info.social_links.map((link, i) => (
                  <SocialPill key={link.platform} link={link} index={i} />
                ))}
              </div>
            )}
          </div>

          {/* ── Right: globe + map (desktop only) ── */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:flex flex-col gap-4"
          >
            {/* Globe — fixed height */}
            <div style={{ height: 300, position: 'relative' }}>
              <Suspense fallback={
                <div className="w-full h-full rounded-2xl animate-pulse"
                     style={{ backgroundColor: 'var(--glass-bg-raised)', border: '1px solid var(--glass-border)' }} />
              }>
                <Globe />
              </Suspense>
            </div>

            {mapEmbedUrl && (
              <MapCard addressRow={addressRow} mapEmbedUrl={mapEmbedUrl} delay={0.5} />
            )}
          </motion.div>
        </div>
      </section>

      {/* ── Map — mobile only (below contact info) ── */}
      {mapEmbedUrl && (
        <section className="lg:hidden px-6 pb-8">
          <MapCard addressRow={addressRow} mapEmbedUrl={mapEmbedUrl} delay={0.3} />
        </section>
      )}
    </Page>
  );
});

ContactUs.displayName = 'ContactUs';
export default ContactUs;
