import React, { memo } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import ReactIcon from '../ui/ReactIcon';
import logo from '../../../assets/images/logo.png';
import useScroll from '../../hooks/useScroll';
import { useTheme } from '../../hooks/useTheme';
import { useCompanyInfo, resolveLogo } from '../../hooks/useCompanyInfo';
import NavBar from './NavBar';
import MobileNavigation from './MobileNavigation';

const Header: React.FC<{ className?: string }> = memo(({ className = '' }) => {
  const isScrolled = useScroll();
  const { theme, toggleTheme } = useTheme();
  const info = useCompanyInfo();

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      style={{ backgroundColor: 'var(--header-bg)' }}
      className={`fixed top-0 left-0 w-full z-50 border-b backdrop-blur-md
        transition-[border-color,box-shadow] duration-300
        ${
          isScrolled
            ? 'border-[var(--border)] shadow-lg shadow-black/10 dark:shadow-black/40'
            : 'border-transparent'
        } ${className}`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-3.5 flex items-center justify-between">
        <Link to="/" className="shrink-0">
          <motion.img
            src={resolveLogo(info, theme, logo)}
            alt={info.name}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = logo;
            }}
            loading="lazy"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.35 }}
            className="h-9 md:h-10 w-auto object-contain"
          />
        </Link>

        <div className="flex items-center gap-3">
          <NavBar />
          <motion.button
            type="button"
            whileTap={{ scale: 0.88 }}
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="w-8 h-8 flex items-center justify-center rounded
              text-[var(--text-muted)] hover:text-[var(--accent)]
              bg-[var(--bg-raised)] border border-[var(--border)]
              transition-colors duration-200 text-base shrink-0"
          >
            {theme === 'dark' ? <ReactIcon name="RiSunLine" size={16} /> : <ReactIcon name="RiMoonLine" size={16} />}
          </motion.button>
          <MobileNavigation />
        </div>
      </div>
    </motion.header>
  );
});

Header.displayName = 'Header';
export default Header;
