import { memo } from "react";
import { motion } from "framer-motion";
import {
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaYoutube
} from 'react-icons/fa';
import { useSocialMediaDataContext } from '../../../contexts/Api/SocialMediaContext';
const SocialMediaLinks = memo(() => {
  const {link_data,isLoading}=useSocialMediaDataContext()
  const socialMediaLinks = [
    {
      icon: FaLinkedin,
      social_media:"Linkedin",
      color: "text-blue-600 hover:text-blue-800",
    },
    {
      icon: FaFacebook,
      social_media:"FaceBook",
      color: "text-blue-700 hover:text-blue-900",

    },
    {
      icon: FaInstagram,
      social_media:"Instragram",
      color: "text-pink-600 hover:text-pink-800",

    },
    {
      icon: FaYoutube,
      social_media:"Youtube",
      color: "text-red-600 hover:text-red-800",
    },
    {
      icon: FaTwitter,
      social_media:"Twitter",
      color: "text-blue-600 hover:text-blue-800",

    }
  ];
  const socialLinks = link_data?.social_media?.map((social:any) => {
    const socialLink = socialMediaLinks.find(link => link.social_media === social.social_media);
    return {
      ...socialLink,
      href: social?.value,
    };
  }) || [];

  return isLoading?(<div>...</div>): (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
      className="flex justify-center md:flex-row flex-col space-x-6 mt-10"
    >
      <h3 className="text-xl font-semibold text-slate-50 mr-6 self-center">
        Follow Us
      </h3>
      <div className="flex justify-center items-center  sm:space-x-6 md:mt-0 mt-6">
      {socialLinks.map((social:any, index:number) => (
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
SocialMediaLinks.displayName = "SocialMediaLinks";
export default SocialMediaLinks;
