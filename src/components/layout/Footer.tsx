import { memo } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  FaFacebookF, FaLinkedinIn, FaInstagram,
  FaWhatsapp, FaTiktok, FaYoutube,
  FaMapMarkerAlt, FaEnvelope, FaPhone, FaClock,
} from 'react-icons/fa';
import logo from '../../assets/images/logo.png';
import { useServiceDataContext } from '../../contexts/Api/ServiceApiContext';

const socialLinks = [
  { icon: FaWhatsapp,   href: 'https://wa.me/+94705359369',                       label: 'WhatsApp' },
  { icon: FaFacebookF,  href: 'https://www.facebook.com/tensorlabs.tech',          label: 'Facebook' },
  { icon: FaLinkedinIn, href: 'https://www.linkedin.com/company/tensoragri',        label: 'LinkedIn' },
  { icon: FaInstagram,  href: 'https://www.instagram.com/tensorlabs.tech',          label: 'Instagram' },
  { icon: FaTiktok,     href: 'https://www.tiktok.com/@tensoragri',                label: 'TikTok' },
  { icon: FaYoutube,    href: 'https://www.youtube.com/@TENSORAGRI',               label: 'YouTube' },
];

const companyLinks = [
  { title: 'About Us',  link: '/about-us' },
  { title: 'Insights',  link: '/services/all' },
  { title: 'Contact',   link: '/contact-us' },
];

const contactInfo = [
  { icon: FaMapMarkerAlt, text: 'Jaffna, Sri Lanka',               href: '#' },
  { icon: FaEnvelope,     text: 'tensoragri@gmail.com',             href: 'mailto:tensoragri@gmail.com' },
  { icon: FaPhone,        text: '+94 070-595-1199',                 href: 'tel:+94705951199' },
  { icon: FaClock,        text: 'Mon – Fri: 8:00 AM – 6:00 PM',    href: undefined },
];

const Footer = () => {
  const { service_data, isLoading } = useServiceDataContext();

  const serviceLinks = isLoading
    ? []
    : (service_data ?? []).map((s: { service_name: string; slug: string }) => ({
        title: s.service_name,
        link: `/services/${s.slug}`,
      }));

  return (
    <footer className="bg-[#092B4A] text-white/70 border-t border-white/10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-7xl mx-auto px-6 lg:px-10 py-16"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="flex flex-col gap-5">
            <Link to="/">
              <img src={logo} alt="Tensor Labs" className="h-10 w-auto object-contain" loading="lazy" />
            </Link>
            <p className="text-sm leading-relaxed text-white/50 max-w-xs">
              Empowering creators and problem-solvers through research, innovation, and practical application.
            </p>
            <div className="flex items-center gap-3 pt-1">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 flex items-center justify-center rounded-sm bg-white/8 text-white/50
                    hover:bg-white/15 hover:text-white transition-all duration-200 text-sm"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-semibold tracking-widest uppercase text-white">Services</h4>
            <ul className="flex flex-col gap-2.5">
              {serviceLinks.length === 0 && isLoading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <li key={i} className="h-4 w-24 bg-white/10 rounded animate-pulse" />
                  ))
                : serviceLinks.map((s: { title: string; link: string }) => (
                    <li key={s.link}>
                      <Link
                        to={s.link}
                        className="text-sm text-white/50 hover:text-white transition-colors duration-200"
                      >
                        {s.title}
                      </Link>
                    </li>
                  ))}
            </ul>
          </div>

          {/* Company */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-semibold tracking-widest uppercase text-white">Company</h4>
            <ul className="flex flex-col gap-2.5">
              {companyLinks.map(({ title, link }) => (
                <li key={link}>
                  <Link
                    to={link}
                    className="text-sm text-white/50 hover:text-white transition-colors duration-200"
                  >
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-semibold tracking-widest uppercase text-white">Contact</h4>
            <ul className="flex flex-col gap-3">
              {contactInfo.map(({ icon: Icon, text, href }) => (
                <li key={text} className="flex items-start gap-3">
                  <Icon className="text-white/30 mt-0.5 shrink-0 text-sm" />
                  {href ? (
                    <a
                      href={href}
                      className="text-sm text-white/50 hover:text-white transition-colors duration-200 leading-snug"
                    >
                      {text}
                    </a>
                  ) : (
                    <span className="text-sm text-white/50 leading-snug">{text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} Tensor Labs. All rights reserved.
          </p>
        </div>
      </motion.div>
    </footer>
  );
};

export default memo(Footer);
