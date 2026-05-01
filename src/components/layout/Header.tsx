import React, {
  memo,
  useEffect, useState
} from 'react';
import { motion} from 'motion/react';
import logo from '../../assets/images/logo.png';
import logo1 from '../../assets/images/logo1.png';
import useScroll from '../../base/hooks/useScroll';
import NavBar from './NavBar';
import MobileNavigation from './MobileNavigation';
import {
  Link,
  useLocation
} from 'react-router-dom';


// Header Component
const Header: React.FC<{ className?: string }> = memo(({ className = '' }) => {
  const isVisible = useScroll();
  const path=useLocation()
  const [ishome,setisHome] = useState(path.pathname === "/about-us" || path.pathname === "/contact-us");
  useEffect(() => {
    setisHome(path.pathname === "/about-us" || path.pathname === "/contact-us");
  }, [path]);
  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{
        opacity: 1,
        y: 0,
        backgroundColor: isVisible ? '#092B4A' : 'transparent',
        boxShadow: isVisible ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none'
      }}
      transition={{
        duration: 0.3,
        ease: 'easeInOut'
      }}
      className={`fixed top-0 left-0 w-full md:px-6 px-3 sm:py-1 py-2 flex justify-between items-center z-50 ${className}`}
    >
      <Link to="/" className="flex items-center">

      <motion.img
        src={isVisible?logo:logo1}
        alt="Logo"
        loading="lazy"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
        className="md:h-12 h-8 object-contain sm:inline-block hidden"
        />
        <motion.img
        src={isVisible?logo:ishome?logo:logo1}
        alt="Logo"
        loading="lazy"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
        className="md:h-12 h-8 object-contain inline-block sm:hidden"
      />
      </Link>


      <NavBar />
      <MobileNavigation/>
    </motion.header>
  );
});

Header.displayName = 'Header';

export default Header;