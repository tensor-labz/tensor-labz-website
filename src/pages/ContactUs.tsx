import React, { memo } from 'react';
import { motion } from 'framer-motion';
import Page from "../components/resuable/Page";
import { useRootContext } from '../contexts/RootContext';
import { useAppContext } from '../contexts/Api/AppContext';
import ContactInfoItem, { contactInfoIcon }  from '../components/Page/Contactus/ContactInfo';
import SocialMediaLinks from '../components/Page/Contactus/SocialMediaLinks';
import ContactusPlaceholder from '../components/Page/Contactus/ContactUsPlaceHolder';

const ContactUs: React.FC = memo(() => {
  const {Data}=useRootContext()
  const {data,isLoading}=useAppContext()
  return (
    <Page HeadProps={{title:"Contact Us"}}>
      <div className="min-h-screen flex items-center justify-center p-6 lg:mx-0 mx-4">
  <picture className="absolute inset-0 -z-10">
          <source media="(min-width: 768px)" srcSet={Data?.contactus?.bg?.lg} />
          <source media="(min-width: 480px)" srcSet={Data?.contactus?.bg?.md} />
          <img src={Data?.contactus?.bg?.sm} alt="" className="w-full h-full object-cover" />
        </picture>
        <div className="max-w-4xl w-full space-y-10 relative  p-4 rounded-2xl shadow-2xl backdrop-blur-md mt-10 flex items-center justify-center flex-col">

          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:text-5xl text-3xl font-bold text-center sm:text-blue-900 text-white md:mb-12 mb-6"
          >
            {Data?.contactus?.title || "Contact Us"}
          </motion.h1>

          <div className="grid md:grid-cols-2 gap-8">
            {isLoading?(Array(4).fill("").map((_, i) => (<ContactusPlaceholder key={ i} />))):data?.map((contact:any,index:number) => (
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

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
          <p className="text-white sm:text-gray-600 italic text-sm md:text-xl max-w-2xl mx-auto sm:font-medium font-bold">
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