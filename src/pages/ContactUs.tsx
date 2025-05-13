import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { IconType } from 'react-icons';
import {
  MdEmail,
  MdPhone,
  MdLocationOn,
  MdBusinessCenter
} from 'react-icons/md';
import {
  FaWhatsapp,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaYoutube
} from 'react-icons/fa';
import Page from "../components/resuable/Page";
import desktop from "../assets/images/Page/ContactUs/ContactusBgLG.png";
import mobile from "../assets/images/Page/ContactUs/ContactusBgSM.webp";
import tablet from "../assets/images/Page/ContactUs/ContactusBgMd.webp";
import { useAppContext } from '../contexts/Api/AppContext';


// Define a type for contact info
type ContactInfoType = {
  title: string;
  value: string;
  icon: IconType;
  linkType?: 'email' | 'phone' | 'whatsapp' | 'default';
};

// Contact Info Component
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
      case 'whatsapp': return `https://wa.me/${(link || '').replace(/\D/g, '')}`;
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

// Social Media Links Component
const SocialMediaLinks = memo(() => {
  const socialLinks = [
    {
      icon: FaLinkedin,
      href: "https://www.linkedin.com/company/innovatetech",
      color: "text-blue-600 hover:text-blue-800"
    },
    {
      icon: FaFacebook,
      href: "https://www.facebook.com/innovatetech",
      color: "text-blue-700 hover:text-blue-900"
    },
    {
      icon: FaInstagram,
      href: "https://www.instagram.com/innovatetech",
      color: "text-pink-600 hover:text-pink-800"
    },
    {
      icon: FaYoutube,
      href: "https://www.youtube.com/c/innovatetech",
      color: "text-red-600 hover:text-red-800"
    },
    {
      icon: FaTwitter,
      href: "https://twitter.com/innovatetech",
      color: "text-blue-400 hover:text-blue-600"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
      className="flex justify-center md:flex-row flex-col space-x-6 mt-10"
    >
      <h3 className="text-xl font-semibold text-slate-50 mr-6 self-center">
        Follow Us
      </h3>
      <div className="flex justify-center space-x-6 md:mt-0 mt-6">
      {socialLinks.map((social, index) => (
        <a
          key={index}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${social.color} transition-colors duration-300 transform hover:scale-110`}
        >
          <social.icon className="md:w-8 md:h-8 w-6 h-6" />
        </a>

      ))}
          </div>
    </motion.div>
  );
});

const ContactUs: React.FC = memo(() => {
  const {data}=useAppContext()
  const contactInfo: Record<string, ContactInfoType> = {
    email: {
      title: "Corporate Email",
      value: data?.email || "",
      icon: MdEmail,
      linkType: 'email'
    },
    phone: {
      title: "Main Office Line",
      value: data?.contact_no || "",
      icon: MdPhone,
      linkType: 'phone'
    },
    whatsapp: {
      title: "Business WhatsApp",
      value: data?.whatsapp || "",
      icon: FaWhatsapp,
      linkType: 'whatsapp'
    },
    address: {
      title: "Headquarters",
      value:data?.address || "",
      icon: MdLocationOn
    }
  };

  return (
    <Page HeadProps={{title:"Contact Us"}}>
      <div className="min-h-screen flex items-center justify-center p-6">
  <picture className="absolute inset-0 -z-10">
          <source media="(min-width: 768px)" srcSet={desktop} />
          <source media="(min-width: 480px)" srcSet={tablet} />
          <img src={mobile} alt="" className="w-full h-full object-cover brightness-75" />
        </picture>
   {/* Global overlay for better content visibility */}
        {/* <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-white" /> */}
        <div className="max-w-4xl w-full space-y-10 relative  p-8 rounded-2xl shadow-2xl backdrop-blur-sm mt-10 flex items-center justify-center flex-col">

          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:text-5xl text-3xl font-bold text-center text-white md:mb-12 mb-6"
          >
            Contact InnovateTech
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
              "Bridging innovation and technology to transform your business challenges into breakthrough solutions."
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