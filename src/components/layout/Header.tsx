import React, { memo } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import logo1 from '../../assets/images/logo1.png';
import useScroll from '../../base/hooks/useScroll';
import NavBar from './NavBar';
import MobileNavigation from './MobileNavigation';

const Header: React.FC<{ className?: string }> = memo(({ className = '' }) => {
  const isScrolled = useScroll();

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{
        opacity: 1,
        y: 0,
        backgroundColor: isScrolled ? '#092B4A' : 'transparent',
        boxShadow: isScrolled ? '0 1px 0 rgba(255,255,255,0.06)' : 'none',
      }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      className={`fixed top-0 left-0 w-full z-50 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4 flex items-center justify-between">
        <Link to="/" className="shrink-0">
          <motion.img
            src={isScrolled ? logo : logo1}
            alt="Tensor Labs"
            loading="lazy"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="h-9 md:h-11 w-auto object-contain"
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
