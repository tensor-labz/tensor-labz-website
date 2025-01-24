import React, { memo } from 'react';
import { motion} from 'framer-motion';
import logo from '../../assets/images/logo.png';

import useScroll from '../../base/hooks/useScroll';
import NavBar from './NavBar';

// Header Component
const Header: React.FC<{ className?: string }> = memo(({ className = '' }) => {
  const isVisible = useScroll();

  return (
    <motion.header 
      initial={{ opacity: 0, y: -50 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        backgroundColor: isVisible ? 'rgba(239, 246, 255, 0.95)' : 'transparent',
        boxShadow: isVisible ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none'
      }}
      transition={{ 
        duration: 0.3,
        ease: 'easeInOut'
      }}
      className={`fixed top-0 left-0 w-full px-6 py-1 flex justify-between items-center z-50 ${className}`}
    >
      <motion.img 
        src={logo} 
        alt="Logo"
        loading="lazy"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
        className="h-12 object-contain"
      />
      <NavBar />
    </motion.header>
  );
});

Header.displayName = 'Header';

export default Header;