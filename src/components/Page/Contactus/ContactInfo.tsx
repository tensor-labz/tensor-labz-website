// Define a type for contact info
import  { memo } from 'react';
import { motion } from 'framer-motion';
import { IconType } from 'react-icons';
import {
  MdEmail,
  MdPhone,
  MdLocationOn,
} from 'react-icons/md';
import {
  FaWhatsapp,
} from 'react-icons/fa';

export type ContactInfoType = {
  title: string;
  icon: IconType;
  linkType?: 'email' | 'phone' | 'whatsapp' | 'default';
};

// Contact Info Component
export const contactInfoIcon = {
  "email": MdEmail,
  "phoneNo": MdPhone,
  "address": MdLocationOn,
  "whatsapp": FaWhatsapp,
  "default": MdLocationOn,
}
const ContactInfoItem = memo(({
  icon: Icon,
  title,
  value,
  link,
  linkType = 'default',
}: {
  icon: IconType;
  title: string;
  value: string;
  link?: string;
  linkType?: 'email' | 'phone' | 'whatsapp' | 'default';
}) => {
  const getLinkHref = () => {
    switch(linkType) {
      case 'email': return `mailto:${link || ''}`;
      case 'phone': return `tel:${link || ''}`;
      case 'whatsapp':return link ? `https://wa.me/${String(link).replace(/\D/g, '')}` : '';
      default: return link || '#';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white border border-blue-100 rounded-2xl sm:p-6 p-4 flex sm:flex-row flex-col items-center justify-center sm:space-x-6
      hover:shadow-xl hover:border-blue-200 transition-all duration-300 group"
    >
      <div className="bg-blue-50 p-3 rounded-full group-hover:bg-blue-100 transition-colors">
        <Icon className="sm:w-10 sm:h-10 w-7 h-7 text-blue-600 group-hover:text-blue-700" />

      </div>
      <div className="flex-grow w-full sm:w-auto">

  <div className="flex-grow w-full sm:w-auto sm:text-justify text-center">
        <h3 className="text-base sm:text-lg font-semibold text-blue-900 mb-1">{title}</h3>
        {link ? (
          <a
            href={getLinkHref()}
            target={linkType === 'whatsapp' ? '_blank' : undefined}
            rel={linkType === 'whatsapp' ? 'noopener noreferrer' : undefined}
            className="text-blue-700 hover:text-blue-900 transition-colors text-xs sm:text-sm break-words inline-block w-full"
          >
            {value}
          </a>
        ) : (
          <p className="text-gray-600 text-xs sm:text-sm break-words w-full">{value}</p>
        )}
      </div>
      </div>
    </motion.div>
  );
});

ContactInfoItem.displayName = "ContactInfoItem";
export default ContactInfoItem;