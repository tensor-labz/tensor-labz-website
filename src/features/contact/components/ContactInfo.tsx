import { memo } from 'react';
import { motion } from 'motion/react';
import ReactIcon from '../../../shared/components/ui/ReactIcon';

export type ContactLinkType = 'email' | 'phone' | 'whatsapp' | 'default';

export const contactInfoIcon: Record<string, string> = {
  email: 'MdEmail',
  phoneNo: 'MdPhone',
  address: 'MdLocationOn',
  whatsapp: 'FaWhatsapp',
  default: 'MdLocationOn',
};

interface ContactInfoItemProps {
  icon: string;
  title: string;
  value: string;
  link?: string;
  linkType?: ContactLinkType;
}

const ContactInfoItem = memo(
  ({
    icon,
    title,
    value,
    link,
    linkType = 'default',
  }: ContactInfoItemProps) => {
    const getLinkHref = () => {
      switch (linkType) {
        case 'email':
          return `mailto:${link ?? ''}`;
        case 'phone':
          return `tel:${link ?? ''}`;
        case 'whatsapp':
          return link ? `https://wa.me/${String(link).replace(/\D/g, '')}` : '';
        default:
          return link ?? '#';
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
          backgroundColor: 'var(--glass-bg-raised)',
          border: '1px solid var(--glass-border)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <div
          className="p-3 rounded-full shrink-0 mb-3 sm:mb-0 transition-colors"
          style={{ backgroundColor: 'var(--accent-soft)' }}
        >
          <ReactIcon
            name={icon}
            size={30}
            style={{ color: 'var(--accent)' }}
            className="transition-colors"
          />
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
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = 'var(--accent)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = 'var(--text-muted)')
              }
            >
              {value}
            </a>
          ) : (
            <p
              className="text-xs sm:text-sm break-words w-full"
              style={{ color: 'var(--text-muted)' }}
            >
              {value}
            </p>
          )}
        </div>
      </motion.div>
    );
  }
);

ContactInfoItem.displayName = 'ContactInfoItem';
export default ContactInfoItem;
