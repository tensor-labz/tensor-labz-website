import { memo } from 'react';
import { motion } from 'motion/react';
import { IconType } from 'react-icons';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';
import { FaWhatsapp } from 'react-icons/fa';

export type ContactInfoType = {
  title: string;
  icon: IconType;
  linkType?: 'email' | 'phone' | 'whatsapp' | 'default';
};

export const contactInfoIcon = {
  "email":    MdEmail,
  "phoneNo":  MdPhone,
  "address":  MdLocationOn,
  "whatsapp": FaWhatsapp,
  "default":  MdLocationOn,
};

const ContactInfoItem = memo(({
  icon: Icon, title, value, link, linkType = 'default',
}: {
  icon: IconType;
  title: string;
  value: string;
  link?: string;
  linkType?: 'email' | 'phone' | 'whatsapp' | 'default';
}) => {
  const getLinkHref = () => {
    switch (linkType) {
      case 'email':    return `mailto:${link || ''}`;
      case 'phone':    return `tel:${link || ''}`;
      case 'whatsapp': return link ? `https://wa.me/${String(link).replace(/\D/g, '')}` : '';
      default:         return link || '#';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl sm:p-6 p-4 flex sm:flex-row flex-col items-center sm:space-x-5
        hover:shadow-lg transition-all duration-300 group"
      style={{
        backgroundColor: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <div
        className="p-3 rounded-full shrink-0 mb-3 sm:mb-0 transition-colors"
        style={{ backgroundColor: 'var(--accent-soft)' }}
      >
        <Icon className="w-7 h-7 sm:w-8 sm:h-8 transition-colors" style={{ color: 'var(--accent)' }} />
      </div>

      <div className="flex-grow w-full sm:w-auto sm:text-left text-center">
        <h3
          className="text-sm sm:text-base font-semibold mb-1"
          style={{ color: 'var(--text-primary)' }}
        >
          {title}
        </h3>
        {link ? (
          <a
            href={getLinkHref()}
            target={linkType === 'whatsapp' ? '_blank' : undefined}
            rel={linkType === 'whatsapp' ? 'noopener noreferrer' : undefined}
            className="text-xs sm:text-sm break-words inline-block w-full transition-colors"
            style={{ color: 'var(--text-muted)' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            {value}
          </a>
        ) : (
          <p className="text-xs sm:text-sm break-words w-full" style={{ color: 'var(--text-muted)' }}>
            {value}
          </p>
        )}
      </div>
    </motion.div>
  );
});

ContactInfoItem.displayName = "ContactInfoItem";
export default ContactInfoItem;
