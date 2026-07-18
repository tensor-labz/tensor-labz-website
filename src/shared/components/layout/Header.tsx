import React, { memo } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/images/logo.png';
import useScroll from '../../hooks/useScroll';
import { useCompanyInfo, resolveLogo } from '../../hooks/useCompanyInfo';
import NavBar from './NavBar';
import MobileNavigation from './MobileNavigation';

const Header: React.FC<{ className?: string }> = memo(({ className = '' }) => {
  const isScrolled = useScroll();
  const info = useCompanyInfo();

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`fixed left-0 top-0 z-50 w-full border-b bg-canvas backdrop-blur-md transition-[border-color,box-shadow] duration-300 ${
        isScrolled
          ? 'border-rim shadow-lg shadow-black/40'
          : 'border-transparent'
      } ${className}`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5 lg:px-10">
        <Link to="/" className="shrink-0">
          <motion.img
            src={resolveLogo(info, logo)}
            alt={info.name}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = logo;
            }}
            loading="lazy"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.35 }}
            className="h-9 w-auto object-contain md:h-10"
          />
        </Link>

        <div className="flex items-center gap-3">
          <NavBar />
          <MobileNavigation />
        </div>
      </div>
    </motion.header>
  );
});

Header.displayName = 'Header';
export default Header;
