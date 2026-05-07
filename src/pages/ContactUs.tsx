import React, { memo } from 'react';
import { motion } from 'motion/react';
import Page from '../components/resuable/Page';
import ContactInfoItem, {
  contactInfoIcon,
} from '../features/contact/components/ContactInfo';
import SocialMediaLinks from '../features/contact/components/SocialMediaLinks';
import ContactUsPlaceholder from '../features/contact/components/ContactUsPlaceholder';
import { useContactController } from '../features/contact/hooks/useContactController';
import data from '../data/data';

const ContactUs: React.FC = memo(() => {
  const { contactData, isLoading } = useContactController();

  return (
    <Page HeadProps={{ title: 'Contact Us' }}>
      <div className="min-h-screen flex items-center justify-center px-4 py-32">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 max-w-4xl w-full rounded-2xl p-8 sm:p-12 flex flex-col items-center gap-10"
          style={{
            backgroundColor: 'var(--glass-bg)',
            border: '1px solid var(--glass-border)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <div className="text-center">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.05 }}
              className="text-[10px] font-semibold tracking-[0.3em] uppercase block mb-4"
              style={{ color: 'var(--accent)' }}
            >
              Get In Touch
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-5xl font-bold"
              style={{
                color: 'var(--text-primary)',
                fontFamily: '"Syne", sans-serif',
              }}
            >
              {data?.contactus?.title || 'Contact Us'}
            </motion.h1>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '3rem' }}
              transition={{ delay: 0.5, duration: 0.5, ease: 'easeOut' }}
              className="h-1 rounded-full mx-auto mt-5"
              style={{ backgroundColor: 'var(--accent)' }}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6 w-full">
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <ContactUsPlaceholder key={i} />
                ))
              : contactData.map((contact, index) => (
                  <ContactInfoItem
                    key={`contactus-${index}`}
                    icon={
                      contactInfoIcon[
                        contact.contact as keyof typeof contactInfoIcon
                      ] ?? contactInfoIcon.default
                    }
                    title={String(contact.title ?? '')}
                    value={String(contact.value ?? '')}
                    link={String(contact.value ?? '')}
                    linkType={
                      contact.contact as
                        | 'email'
                        | 'phone'
                        | 'whatsapp'
                        | 'default'
                    }
                  />
                ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center italic text-sm md:text-base max-w-2xl"
            style={{ color: 'var(--text-muted)' }}
          >
            {data?.contactus?.quote}
          </motion.p>

          <SocialMediaLinks />
        </motion.div>
      </div>
    </Page>
  );
});

ContactUs.displayName = 'ContactUs';
export default ContactUs;
