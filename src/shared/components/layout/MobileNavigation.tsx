import React, { memo, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate, useLocation } from 'react-router-dom';
import ReactIcon from '../ui/ReactIcon';
import navData from '../../../data/nav_data';
import logo from '../../../assets/images/logo.png';
import { useCompanyInfo, resolveLogo } from '../../hooks/useCompanyInfo';

interface MobileNavItemProps {
  nav: string;
  to: string;
  index: number;
  isActive: boolean;
  onNavigate: () => void;
}

const MobileNavItem: React.FC<MobileNavItemProps> = memo(
  ({ nav, to, index, isActive, onNavigate }) => {
    const navigate = useNavigate();

    const handleClick = () => {
      onNavigate();
      setTimeout(() => navigate(to), 260);
    };

    return (
      <motion.button
        type="button"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          delay: index * 0.06 + 0.1,
          duration: 0.3,
          ease: 'easeOut',
        }}
        onClick={handleClick}
        className={`w-full border-b border-rim px-6 py-4 text-left text-xs font-semibold uppercase tracking-widest transition-colors duration-200 ${
          isActive
            ? 'bg-sky-500/10 text-accent'
            : 'text-muted hover:bg-raised hover:text-fg'
        }`}
      >
        {nav}
      </motion.button>
    );
  }
);

MobileNavItem.displayName = 'MobileNavItem';

const MobileNavigation: React.FC = memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const info = useCompanyInfo();

  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen((v) => !v);

  return (
    <>
      <div className="md:hidden">
        <motion.button
          type="button"
          whileTap={{ scale: 0.9 }}
          onClick={toggle}
          aria-label="Toggle navigation"
          className="text-2xl text-muted transition-colors hover:text-fg focus:outline-none"
        >
          {isOpen ? (
            <ReactIcon name="RiCloseLine" size={24} />
          ) : (
            <ReactIcon name="RiMenu3Line" size={24} />
          )}
        </motion.button>
      </div>

      {createPortal(
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                key="overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={close}
                className="fixed inset-0 z-[99] bg-black/40 backdrop-blur-sm"
              />
              <motion.div
                key="drawer"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 28, stiffness: 280 }}
                className="fixed right-0 top-0 z-[100] flex h-full w-72 flex-col border-l border-rim bg-surface shadow-2xl"
              >
                <div className="flex items-center justify-between border-b border-rim px-6 py-5">
                  <button
                    type="button"
                    className="cursor-pointer border-0 bg-transparent p-0"
                    onClick={() => {
                      navigate('/');
                      close();
                    }}
                  >
                    <img
                      src={resolveLogo(info, logo)}
                      alt={info.name}
                      className="h-9 w-auto object-contain"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = logo;
                      }}
                    />
                  </button>
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.9 }}
                    onClick={close}
                    className="text-2xl text-muted transition-colors hover:text-fg"
                  >
                    <ReactIcon name="RiCloseLine" size={24} />
                  </motion.button>
                </div>

                <nav className="mt-2 flex flex-col">
                  {navData.map((item, i) => (
                    <MobileNavItem
                      key={i}
                      nav={item.nav}
                      to={item.to}
                      index={i}
                      isActive={
                        item.to === '/'
                          ? pathname === '/'
                          : pathname.startsWith(item.to)
                      }
                      onNavigate={close}
                    />
                  ))}
                </nav>

                <div className="mt-auto border-t border-rim px-6 py-6">
                  <p className="text-[10px] uppercase tracking-widest text-muted">
                    {info.name}
                  </p>
                  <p className="mt-1 text-[10px] text-muted opacity-60">
                    {info.tagline}
                  </p>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
});

MobileNavigation.displayName = 'MobileNavigation';
export default MobileNavigation;
