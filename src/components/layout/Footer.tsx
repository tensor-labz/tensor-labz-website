import { memo } from 'react';
import { motion } from 'framer-motion';
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaMapMarkerAlt, FaEnvelope, FaPhone, FaClock,FaWhatsapp,FaTiktok,FaYoutube } from 'react-icons/fa';
import logo from "../../assets/images/logo.png";
import { useServiceDataContext } from '../../contexts/Api/ServiceApiContext';

const Footer = () => {
  const { service_data, isLoading } = useServiceDataContext();

  const socialLinks = [
    { icon: FaWhatsapp, href: "https://wa.me/+94705359369", color: "text-green-400 hover:text-green-300" },
    { icon: FaFacebookF, href: "https://www.facebook.com/tensorlabz", color: "text-blue-400 hover:text-blue-300" },
    { icon: FaLinkedinIn, href: "https://lk.linkedin.com/company/tensoragri", color: "text-blue-400 hover:text-blue-300" },
    { icon: FaInstagram, href: "https://www.instagram.com/tensorlabz", color: "text-pink-400 hover:text-pink-300" },
    { icon: FaTiktok, href: "https://www.tiktok.com/@tensoragri", color: "text-gray-200 hover:text-gray-100 border-3 border-white" },
    { icon: FaYoutube, href: "http://www.youtube.com/@TENSORAGRI", color: "text-red-400 hover:text-red-300" }
  ];

  const footerLinks = [
    { title: "Services", links: isLoading ? [] : service_data?.map((service: any) => ({ title: service?.service_name, link: `/services${service?.slug}` })) },
    { title: "Company", links: [{ title: "About Us", link: "/about-us" }, { title: "Insights", link: "/services" }, { title: "Contact", link: "/contact-us" }] },
  ];

  const contactInfo = [
    { icon: FaMapMarkerAlt, text: "Kalviyankadu, Jaffna, Srilanka.", type: "address",href:"#" },
    { icon: FaEnvelope, text: "tensoragri@gmail.com", type: "email", href: "mailto:tensoragri@gmail.com" },
    { icon: FaPhone, text: "+94 070-595-1199", type: "phone", href: "tel:+94705951199" },
    { icon: FaClock, text: "Mon - Fri: 8:00 AM - 6:00 PM", type: "hours" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const socialVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "backOut"
      }
    },
    hover: {
      scale: 1.2,
      rotate: 5,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <footer className=" bg-[#092B4A] text-slate-200 py-16 border-t-2 border-blue-200/20 relative overflow-hidden">
      {/* Background decoration */}
      {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 pointer-events-none"></div> */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-purple-600 to-blue-900"></div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-screen-xl mx-auto px-6 relative z-10"
      >
        <div className="grid lg:grid-cols-12 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Company Info */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-4 md:col-span-2 flex flex-col items-center md:items-start space-y-4"
          >
            <motion.img
              src={logo}
              alt='Tensor Labz Logo'
              className='h-16 w-auto object-contain'
              loading='lazy'
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
            <p className="text-slate-300 text-center md:text-left max-w-xs leading-relaxed">
              Empowering creators and problem-solvers through research, innovation, and practical application.
            </p>

            {/* Social Media Links */}
            <div className="flex space-x-4 pt-4 lg:col-span-4">
              {socialLinks?.map(({ icon: Icon, href, color }) => (
                <motion.a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={socialVariants}
                  whileHover="hover"
                  className={`text-xl ${color} transition-colors p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm`}
                >
                  <Icon />
                </motion.a>
              ))}
            </div>
          </motion.div >
          <motion.div
  variants={itemVariants}
  className="lg:col-span-4 flex flex-col md:flex-row justify-between md:space-x-4 space-y-4 md:space-y-0"
>
  {footerLinks?.map((section, index) => (
    <div
      key={section.title}
      className={`flex flex-col items-center md:items-start space-y-4 break-words ${
        index === 0 ? 'md:basis-2/3' : 'md:basis-1/3'
      }`}
    >
      <h4 className="font-bold text-lg text-white relative">
        {section?.title}
        <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
      </h4>
      <div className="space-y-2 w-full">
        {section?.links?.map((link: any) => (
          <motion.a
            key={link?.title}
            href={link?.link}
            className="text-slate-300 hover:text-white transition-colors block relative overflow-hidden group text-center md:text-left break-words"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            <span className="relative z-10">{link.title}</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.1 shadow-md bg-white group-hover:w-full transition-all duration-300"></span>
          </motion.a>
        ))}
      </div>
    </div>
  ))}
</motion.div>
           {/* Contact Information */}
           <motion.div
            variants={itemVariants}
            className="lg:col-span-4 md:col-span-2 flex flex-col items-center md:items-start space-y-4"
          >
            <h4 className="font-bold text-lg text-white">Contact Us</h4>
            <div className="space-y-3 w-full">
              {contactInfo.map((contact, index) => (
                <motion.div
                  key={index}
                  className="flex items-center md:items-start justify-center md:justify-start space-x-3 group"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    className="flex-shrink-0 w-5 h-5 mt-1 text-blue-400 group-hover:text-blue-300 transition-colors md:block hidden"
                    whileHover={{ scale: 1.1 }}
                  >
                    <contact.icon />
                  </motion.div>
                  {contact.href ? (
                    <a
                      href={contact.href}
                      className="text-slate-300 hover:text-white transition-colors text-sm leading-relaxed text-center md:text-left"
                    >
                      {contact.text}
                    </a>
                  ) : (
                    <span className="text-slate-300 text-sm leading-relaxed text-center md:text-left">
                      {contact.text}
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          variants={itemVariants}
          className="border-t border-blue-200/20 pt-8 mt-12 text-center"
        >
          <div className="flex flex-col justify-center items-center space-y-4 md:space-y-0">
            <p className="text-slate-300 text-sm">
              &copy; {new Date().getFullYear()} <span className="font-bold text-white">Tensor Labz</span>.
              All rights reserved.
            </p>

          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}

export default memo(Footer);