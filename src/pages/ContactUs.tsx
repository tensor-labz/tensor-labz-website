import React, { memo } from 'react';
import { motion } from 'motion/react';
import Page from "../components/resuable/Page";
import { useRootContext } from '../contexts/RootContext';
import { useAppContext } from '../contexts/Api/AppContext';
import ContactInfoItem, { contactInfoIcon } from '../components/Page/Contactus/ContactInfo';
import SocialMediaLinks from '../components/Page/Contactus/SocialMediaLinks';
import ContactusPlaceholder from '../components/Page/Contactus/ContactUsPlaceHolder';

const ContactUs: React.FC = memo(() => {
  const { Data } = useRootContext();
  const { data, isLoading } = useAppContext();

  return (
    <Page HeadProps={{ title: "Contact Us" }}>
      <div className="relative min-h-screen flex items-center justify-center px-4 py-32">

        {/* Background */}
        <picture className="absolute inset-0 -z-10">
          <source media="(min-width: 768px)" srcSet={Data?.contactus?.bg?.lg} />
          <source media="(min-width: 480px)" srcSet={Data?.contactus?.bg?.md} />
          <img src={Data?.contactus?.bg?.sm} alt="" className="w-full h-full object-cover" />
        </picture>
        <div className="absolute inset-0 -z-10 bg-slate-950/55 dark:bg-slate-950/70" />

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl w-full rounded-2xl
            bg-white/5 dark:bg-white/3 backdrop-blur-md
            border border-white/10 p-8 sm:p-12
            flex flex-col items-center gap-10"
        >
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-center text-white"
            style={{ fontFamily: '"Syne", sans-serif' }}
          >
            {Data?.contactus?.title || "Contact Us"}
          </motion.h1>

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
            className="text-center text-white/60 italic text-sm md:text-base max-w-2xl"
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
