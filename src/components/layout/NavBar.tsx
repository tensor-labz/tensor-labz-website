import navData from '../../data/nav_data';
import { NavLink } from 'react-router-dom';
import {AnimatePresence,motion } from 'framer-motion';
import useScroll from '../../base/hooks/useScroll';

const NavBar: React.FC = () => {
  const isVisible = useScroll();

  return (
    <nav className="md:flex hidden items-center space-x-6">
      <AnimatePresence>
        {navData.map((navItem, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ 
              delay: index * 0.1,
              type: 'spring',
              stiffness: 300
            }}
          >
            <NavLink 
              to={navItem.to}
              className="group relative inline-block overflow-hidden"
            >
              {isVisible ? (
                <motion.span 
                  className="inline-block text-lg font-semibold text-blue-800 relative  after:content-[''] 
  after:rounded-xl 
  after:absolute 
  after:left-0 after:bottom-0 
  after:h-0.5 sm:after:h-1 after:w-0 
  after:bg-blue-800 
  after:transition-all after:duration-300 hover:after:w-3/4 "
                >
                  {navItem.nav}
                </motion.span>
              ) : (
                <motion.span 
                  className="block p-2 text-xl text-blue-900 hover:bg-gradient-to-b from-white via-blue-50 to-blue-200 rounded-full"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {navItem.icon}
                </motion.span>
              )}
            </NavLink>
          </motion.div>
        ))}
      </AnimatePresence>
    </nav>
  );
};

export default NavBar