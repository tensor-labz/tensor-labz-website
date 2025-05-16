import React, { memo } from 'react';
import { motion } from 'framer-motion';

import Page from "../components/resuable/Page";
import { useRootContext } from '../contexts/RootContext';

import ContactInfoItem  from '../components/Page/Contactus/ContactInfo';
import SocialMediaLinks from '../components/Page/Contactus/SocialMediaLinks';

const ContactUs: React.FC = memo(() => {
  const {Data}=useRootContext()


  return (
    <Page HeadProps={{title:"Contact Us"}}>
      <div className="min-h-screen flex items-center justify-center p-6">
  <picture className="absolute inset-0 -z-10">
          <source media="(min-width: 768px)" srcSet={Data?.contactus?.bg?.lg} />
          <source media="(min-width: 480px)" srcSet={Data?.contactus?.bg?.md} />
          <img src={Data?.contactus?.bg?.sm} alt="" className="w-full h-full object-cover brightness-75" />
        </picture>
   {/* Global overlay for better content visibility */}
        {/* <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-white" /> */}
        <div className="max-w-4xl w-full space-y-10 relative  p-8 rounded-2xl shadow-2xl backdrop-blur-sm mt-10 flex items-center justify-center flex-col">

          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:text-5xl text-3xl font-bold text-center text-white md:mb-12 mb-6"
          >
            {Data?.contactus?.title || "Contact Us"}
          </motion.h1>

          <div className="grid md:grid-cols-2 gap-8">
            {Object.entries(contactInfo).map(([key, info]) => (
              <ContactInfoItem
                key={key}
                icon={info.icon}
                title={info.title}
                value={info.value}
                link={info.value}
                linkType={info.linkType}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <p className="text-white italic text-xl max-w-2xl mx-auto font-light">
              {Data?.contactus?.quote}
            </p>
          </motion.div>

          <SocialMediaLinks />
        </div>
      </div>
    </Page>
  );
});

ContactUs.displayName = 'ContactUs';
export default ContactUs;