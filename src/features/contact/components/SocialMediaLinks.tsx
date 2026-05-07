import { memo, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  FaLinkedin,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaTiktok,
} from 'react-icons/fa';
import { IconType } from 'react-icons';
import { fetchSocialLinks } from '../../../services/socialService';

interface SocialMediaItem {
  social_media: string;
  value: string;
}

interface SocialLink {
  icon: IconType;
  social_media: string;
  color: string;
  href: string;
}

const socialMediaConfig: Omit<SocialLink, 'href'>[] = [
  {
    icon: FaLinkedin,
    social_media: 'Linkedin',
    color: 'text-blue-600 hover:text-blue-800',
  },
  {
    icon: FaFacebook,
    social_media: 'FaceBook',
    color: 'text-sky-700 hover:text-sky-900',
  },
  {
    icon: FaInstagram,
    social_media: 'Instagram',
    color: 'text-pink-600 hover:text-pink-800',
  },
  {
    icon: FaYoutube,
    social_media: 'Youtube',
    color: 'text-red-600 hover:text-red-800',
  },
  {
    icon: FaTiktok,
    social_media: 'Tiktok',
    color: 'text-black-400 hover:text-black-600',
  },
];

const LoadingSkeleton = () => (
  <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mt-10 mx-auto px-4">
    <div className="h-6 w-24 bg-blue-700 rounded animate-pulse" />
    <div className="flex justify-center items-center space-x-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="w-6 h-6 md:w-8 md:h-8 bg-gray-700 rounded-full animate-pulse"
        />
      ))}
    </div>
  </div>
);

const SocialMediaLinks = memo(() => {
  const [items, setItems] = useState<SocialMediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    fetchSocialLinks(controller.signal)
      .then((rows) => setItems(rows))
      .catch((err) => {
        if (err instanceof Error && err.name !== 'AbortError') {
          console.error('Error fetching social media links:', err);
        }
      })
      .finally(() => setIsLoading(false));
    return () => controller.abort();
  }, []);

  if (isLoading) return <LoadingSkeleton />;

  const socialLinks: SocialLink[] = items
    .map((item) => {
      const config = socialMediaConfig.find(
        (c) => c.social_media === item.social_media
      );
      return config ? { ...config, href: item.value } : null;
    })
    .filter((x): x is SocialLink => x !== null);

  if (!socialLinks.length) {
    return (
      <div className="flex justify-center items-center mt-10 mx-auto px-4">
        <p className="text-red-500 text-sm">No social media links available</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.8, ease: 'easeInOut' }}
      className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mt-10 mx-auto px-4 py-6 rounded-lg"
    >
      <motion.h3
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="text-xl font-semibold text-slate-50 sm:text-blue-800 text-center"
      >
        Follow Us
      </motion.h3>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="flex justify-center items-center space-x-4 sm:space-x-6"
      >
        {socialLinks.map((social, index) => {
          const IconComponent = social.icon;
          return (
            <motion.a
              key={`${social.social_media}-${index}`}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${social.color} transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-full p-2`}
              whileHover={{
                scale: 1.2,
                rotate: 5,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + index * 0.1, duration: 0.4 }}
              aria-label={`Follow us on ${social.social_media}`}
            >
              <IconComponent className="w-6 h-6 md:w-8 md:h-8" />
            </motion.a>
          );
        })}
      </motion.div>
    </motion.div>
  );
});

SocialMediaLinks.displayName = 'SocialMediaLinks';
export default SocialMediaLinks;
