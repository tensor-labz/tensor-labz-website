import React, { memo } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import useScroll from '../../base/hooks/useScroll';
import NavBar from './NavBar';
import MobileNavigation from './MobileNavigation';

const Header: React.FC<{ className?: string }> = memo(({ className = '' }) => {
  const isScrolled = useScroll();

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      style={{ backgroundColor: 'rgba(15, 23, 42, 0.92)' }}
      className={`fixed top-0 left-0 w-full z-50 border-b transition-colors duration-300
        ${isScrolled
          ? 'bg-slate-900 border-white/8 shadow-lg shadow-black/20'
          : 'bg-slate-900/90 backdrop-blur-md border-white/5'
        } ${className}`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-3.5 flex items-center justify-between">
        <Link to="/" className="shrink-0">
          <motion.img
            src={logo}
            alt="Tensor Labs"
            loading="lazy"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.35 }}
            className="h-9 md:h-10 w-auto object-contain"
          />
        </Link>

        <NavBar />
        <MobileNavigation />
      </div>
    </motion.header>
  );
});

Header.displayName = 'Header';
export default Header;
