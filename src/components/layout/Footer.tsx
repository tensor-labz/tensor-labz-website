import { memo } from 'react';
import { motion } from 'framer-motion';
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaTwitter, FaGithub } from 'react-icons/fa';
import logo from "../../assets/images/logo.png";

const Footer = () => {
  const socialLinks = [
    { icon: FaFacebookF, href: "https://facebook.com/tensorlabz", color: "text-slate-500 hover:text-slate-600" },
    { icon: FaLinkedinIn, href: "https://linkedin.com/company/tensorlabz", color: "text-slate-400 hover:text-slate-500" },
    { icon: FaInstagram, href: "https://instagram.com/tensorlabz", color: "text-slate-300 hover:text-bluslate-400" },
    { icon: FaTwitter, href: "https://twitter.com/tensorlabz", color: "text-slate-200 hover:text-slate-300" },
    { icon: FaGithub, href: "https://github.com/tensorlabz", color: "text-slate-100 hover:text-slate-200" }
  ];

  const footerLinks = [
    { title: "Services", links: ["Web Development", "Mobile Apps", "Cloud Solutions"] },
    { title: "Company", links: ["About Us", "Careers", "Contact"] },
    { title: "Resources", links: ["Blog", "Case Studies", "White Papers"] }
  ];

  return (
    <footer className="bg-gray-700 text-slate-200 py-12 border-t-2 border-blue-200">
      <div className="max-w-screen-xl mx-auto px-6 grid md:grid-cols-4 gap-8">
        {/* Company Info */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="col-span-full md:col-span-1 flex flex-col items-center md:items-start"
        >
          <img 
            src={logo} 
            alt='Tensor Labz Logo' 
            className='h-16 w-auto object-contain mb-4' 
            loading='lazy'
          />
          <p className="text-slate-50 text-center md:text-left max-w-xs">
            Transforming digital landscapes through innovative software solutions.
          </p>
        </motion.div>

        {/* Footer Links */}
        {footerLinks.map((section, index) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="flex flex-col items-center md:items-start"
          >
            <h4 className="font-bold text-lg mb-4 text-white">{section.title}</h4>
            {section.links.map((link) => (
              <a 
                key={link} 
                href="#" 
                className="text-slate-300 hover:text-slate-200 transition-colors mb-2"
              >
                {link}
              </a>
            ))}
          </motion.div>
        ))}

        {/* Social Media Links */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="col-span-full md:col-span-1 flex justify-center md:justify-end items-center space-x-6"
        >
          {socialLinks.map(({ icon: Icon, href, color }) => (
            <a 
              key={href} 
              href={href} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`text-2xl ${color} transition-transform hover:scale-110`}
            >
              <Icon />
            </a>
          ))}
        </motion.div>

        {/* Copyright */}
        <div className="col-span-full border-t border-blue-200 pt-6 mt-6 text-center">
          <p className="text-slate-300">
            &copy; {new Date().getFullYear()} <span className="font-bold text-slate-100">Tensor Labz</span>. 
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default memo(Footer);