import React, { memo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { RiCloseLine, RiMenu3Line } from 'react-icons/ri';
import navData from '../../data/nav_data';
import logo from '../../assets/images/logo.png';

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
        transition={{ delay: index * 0.06 + 0.1, duration: 0.3, ease: 'easeOut' }}
        onClick={handleClick}
        className={`w-full text-left px-6 py-4 text-xs font-semibold tracking-widest uppercase
          border-b border-white/5 transition-colors duration-200
          ${isActive
            ? 'text-sky-400 bg-sky-500/10'
            : 'text-slate-300 hover:text-white hover:bg-white/5'
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

  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen(v => !v);

  return (
    <>
      {/* Hamburger */}
      <div className="md:hidden">
        <motion.button
          type="button"
          whileTap={{ scale: 0.9 }}
          onClick={toggle}
          aria-label="Toggle navigation"
          className="text-slate-300 hover:text-white text-2xl focus:outline-none transition-colors"
        >
          {isOpen ? <RiCloseLine /> : <RiMenu3Line />}
        </motion.button>
      </div>

      {/* Overlay + Drawer */}
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
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />

            <motion.div
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed top-0 right-0 h-full w-72 bg-slate-900 border-l border-white/8 z-50 flex flex-col"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/8">
                <button
                  type="button"
                  className="bg-transparent border-0 p-0 cursor-pointer"
                  onClick={() => { navigate('/'); close(); }}
                >
                  <img src={logo} alt="Tensor Labs" className="h-9 w-auto object-contain" />
                </button>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.9 }}
                  onClick={close}
                  className="text-slate-400 hover:text-white text-2xl transition-colors"
                >
                  <RiCloseLine />
                </motion.button>
              </div>

              {/* Nav items */}
              <nav className="flex flex-col mt-2">
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

              {/* Footer note */}
              <div className="mt-auto px-6 py-6 border-t border-white/8">
                <p className="text-slate-500 text-[10px] tracking-widest uppercase">
                  Tensor Labs
                </p>
                <p className="text-slate-600 text-[10px] mt-1">
                  Engineering & Technology
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
});

MobileNavigation.displayName = 'MobileNavigation';
export default MobileNavigation;
