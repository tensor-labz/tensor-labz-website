import React, { memo, Suspense } from 'react';
import { motion } from 'motion/react';
import Page from "../components/resuable/Page";
import { useRootContext } from '../contexts/RootContext';
import { useAppContext } from '../contexts/Api/AppContext';
import ContactInfoItem, { contactInfoIcon } from '../components/Page/Contactus/ContactInfo';
import SocialMediaLinks from '../components/Page/Contactus/SocialMediaLinks';
import ContactusPlaceholder from '../components/Page/Contactus/ContactUsPlaceHolder';
import PageBackground from '../components/three/PageBackground';

const ContactUs: React.FC = memo(() => {
  const { Data } = useRootContext();
  const { data, isLoading } = useAppContext();

  return (
    <Page HeadProps={{ title: "Contact Us" }}>
      <div
        className="relative min-h-screen flex items-center justify-center px-4 py-32"
        style={{ backgroundColor: 'var(--bg-base)' }}
      >
        {/* Three.js animated background */}
        <Suspense fallback={null}>
          <PageBackground />
        </Suspense>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 max-w-4xl w-full rounded-2xl p-8 sm:p-12 flex flex-col items-center gap-10"
          style={{
            backgroundColor: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
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
              style={{ color: 'var(--text-primary)', fontFamily: '"Syne", sans-serif' }}
            >
              {Data?.contactus?.title || "Contact Us"}
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
              ? Array(4).fill("").map((_, i) => <ContactusPlaceholder key={i} />)
              : data?.map((contact: any, index: number) => (
                  <ContactInfoItem
                    key={`contactus-${index}`}
                    icon={contactInfoIcon[contact?.contact as keyof typeof contactInfoIcon]}
                    title={contact?.title}
                    value={contact.value}
                    link={contact.value}
                    linkType={contact.contact}
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
            {Data?.contactus?.quote}
          </motion.p>

          <SocialMediaLinks />
        </motion.div>
      </div>
    </Page>
  );
});

ContactUs.displayName = 'ContactUs';
export default ContactUs;
